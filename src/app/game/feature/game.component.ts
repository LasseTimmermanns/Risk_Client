import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { globals } from 'src/app/globals';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { CookieService } from 'src/app/shared/utils/cookie/cookie.service';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
import { Player } from '../data_access/player';
import { SmallErrorMessageComponent } from '../ui/small-error-message/small-error-message.component';
import { TroopMovementSliderComponent } from '../ui/troop-movement-slider/troop-movement-slider.component';
import { AttackService } from '../utils/attack.service';
import { GameMapService } from '../utils/game-map.service';
import { GameService } from '../utils/game.service';
import { PlayerDisplayService } from '../utils/player-display.service';
import { GameTerritory } from './../data_access/territory';
import { DeploymentService } from './../utils/deployment.service';
import { GameManagementService } from './../utils/game-management.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  messages: string[] = [];
  queryIdentification!: QueryIdentification;

  @ViewChild('selection', { read: ViewContainerRef, static: true })
  selectionDiv!: ViewContainerRef;

  selectedPrimaryId?: number;
  selectedSecondaryId?: number;
  possiblePrimarySelectionIds: number[] = [];
  possibleAttacks: number[] = [];
  attacker?: Player;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    public gameService: GameService,
    private playerDisplayService: PlayerDisplayService,
    private gameMapService: GameMapService,
    private deploymentService: DeploymentService,
    private gameManagementService: GameManagementService,
    private attackService: AttackService
  ) {}

  ngOnInit(): void {
    this.connect();
    WebSocketHelper.redirectOnSocketClose(
      this.queryIdentification.socket,
      this.router
    );

    this.receiveMessages(this.queryIdentification.socket);
  }

  connect() {
    const roomId = this.cookieService.getCookie('gameId');
    const token = this.cookieService.getCookie('token');
    const socket = new WebSocket(`ws://${globals.springServer}/game`);

    socket.onopen = (e) => {
      const msg = WebSocketHelper.createMessage('join', {
        gameId: roomId,
        token: token,
      });

      console.log(socket);
      socket.send(msg);
    };

    socket.onclose = (e) => {
      this.router.navigate(['']);
    };

    this.queryIdentification = new QueryIdentification(roomId, token, socket);
  }

  receiveMessages(socket: WebSocket) {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      let eventType = data.event;
      console.log(data);

      switch (eventType) {
        case 'success':
          this.gameService.game = data.data.game;
          this.gameService.map = data.data.map;
          this.gameService.playerId = data.data.playerId;
          this.gameService.updateDisplayNames();
          this.playerDisplayService.generateDisplayPlayers();
          this.gameService.updatePlayerOnTurn();
          this.gameMapService.generateDrawInformation();
          this.startPhase(this.gameService.game!.phase);
          console.log(this.gameService.playerId);
          console.log(this.gameService.playerOnTurn?.id);
          break;
        case 'gameaction':
          this.receiveGameActions(data);
          break;
        case 'declined':
          console.log('Declined');
      }
    };
  }

  receiveGameActions(data: any) {
    switch (data.action) {
      case 'start':
        console.log('Game started');
        break;
      case 'beginDeployment':
        this.deploymentService.setTroopsLeft(
          data.data.playerId,
          data.data.amount
        );
        break;
      case 'deploy':
        this.deploymentService.deploymentReceived(
          data.data.territoryId,
          data.data.amount
        );
        break;
      case 'nextPhase':
        this.gameManagementService.onNextPhase();
        this.startPhase(this.gameService.game!.phase);
        break;
      case 'nextTurn':
        this.gameManagementService.onNextTurn();
        this.startPhase(this.gameService.game!.phase);
        break;
    }
  }

  retrieveTroopCount(min: number, max: number) {
    const slider = this.selectionDiv.createComponent(
      TroopMovementSliderComponent
    );
    slider.setInput('min', min);
    slider.setInput('max', max);

    return slider;
  }

  selectTerritory(clickInformation: number[]) {
    //clickInformation - 0: territoryId, 1: mouseX, 2: mouseY
    switch (this.gameService.game!.phase) {
      case 0:
        this.deploymentSelect(clickInformation);
        break;
      case 1:
        this.attackSelect(clickInformation);
        break;
    }
  }

  startPhase(phase: number) {
    switch (phase) {
      case 0:
        this.beginDeployment();
        break;
      case 1:
        this.beginAttack();
        break;
    }
  }

  beginDeployment() {
    const ownedTerritories: GameTerritory[] | undefined =
      this.gameService.game?.territories.filter(
        (t) => t.owner === this.gameService.playerOnTurn?.id
      );

    if (!ownedTerritories) {
      this.possiblePrimarySelectionIds = [];
      return;
    }

    this.possiblePrimarySelectionIds = ownedTerritories.map((t) => t.id);
  }

  deploymentSelect(clickinformation: number[]) {
    var troopsLeft = this.deploymentService.getTroopsLeft(
      this.gameService.playerId!
    );

    if (troopsLeft < 1) {
      this.displayError(
        "You've deployed all your troops!",
        clickinformation[1],
        clickinformation[2]
      );
      return;
    }

    const territoryId = clickinformation[0];
    this.selectedPrimaryId = territoryId;
    const slider = this.retrieveTroopCount(1, troopsLeft);

    var lastValue = 0;

    slider.instance.valueChange.subscribe((value: number) => {
      this.gameService.game!.territories.find(
        (t) => t.id === this.selectedPrimaryId
      )!.troops += value - lastValue;

      lastValue = value;
    });

    slider.instance.onAbort.subscribe((value: boolean) => {
      this.gameService.game!.territories.find(
        (t) => t.id === territoryId
      )!.troops += -lastValue;
      this.selectedPrimaryId = undefined;
      slider.destroy();
    });

    slider.instance.onSubmit.subscribe((value: number) => {
      this.deploymentService.submitDeploy(
        value,
        territoryId,
        this.queryIdentification
      );
      this.gameService.game!.territories.find(
        (t) => t.id === this.selectedPrimaryId
      )!.troops += -lastValue;
      this.selectedPrimaryId = undefined;
      slider.destroy();
    });
  }

  beginAttack() {
    const ownedTerritories: GameTerritory[] =
      this.gameService.game!.territories.filter(
        (t) => t.owner === this.gameService.playerOnTurn?.id
      );

    this.possiblePrimarySelectionIds = ownedTerritories.map((t) => t.id);
  }

  attackSelect(clickinformation: number[]) {
    if (!this.gameService.thisPlayersTurn) {
      console.log('Not Players turn');
      return;
    }

    if (
      !(
        this.possiblePrimarySelectionIds.includes(clickinformation[0]) ||
        this.possibleAttacks.includes(clickinformation[0])
      )
    )
      return;

    const gameTerritory = this.gameService.game?.territories.find(
      (t) => t.id === clickinformation[0]
    );

    const mapTerritory = this.gameService.map?.territories.find(
      (t) => t.id === clickinformation[0]
    );

    if (!gameTerritory || !mapTerritory) throw Error('Territory not Found');

    if (gameTerritory.owner === this.gameService.playerId) {
      this.selectedPrimaryId = clickinformation[0];
      this.selectedSecondaryId = undefined;
      this.attacker = this.gameService.game?.players.find(
        (p) => p.id === this.gameService.playerId
      );

      this.possibleAttacks = this.attackService.getPossibleAttacks(
        mapTerritory,
        this.gameService.playerId
      );

      console.log('Attacker', this.attacker);

      const ownedTerritories: GameTerritory[] | undefined =
        this.gameService.game?.territories.filter(
          (t) => t.owner === this.gameService.playerOnTurn?.id
        );

      this.possiblePrimarySelectionIds = ownedTerritories!.map((t) => t.id);
      return;
    } else {
      console.log('Attack');
      // Attack other
      this.selectedSecondaryId = clickinformation[0];
      console.log(
        'Attacking',
        this.selectedPrimaryId,
        this.selectedSecondaryId
      );
    }
  }

  displayError(msg: string, x: number, y: number) {
    const errorMessage = this.selectionDiv.createComponent(
      SmallErrorMessageComponent
    );

    errorMessage.setInput('message', msg);
    errorMessage.location.nativeElement.style.left = x + 'px';
    errorMessage.location.nativeElement.style.top = y + 'px';

    setTimeout(() => {
      errorMessage.destroy();
    }, 2000);
  }

  nextPhase() {
    if (!this.gameService.thisPlayersTurn) return;

    if (this.gameService.game!.phase === 0) {
      if (this.deploymentService.getTroopsLeft(this.gameService.playerId!) > 0)
        return;
    }

    this.possibleAttacks = [];
    this.possiblePrimarySelectionIds = [];
    this.selectedPrimaryId = undefined;
    this.selectedSecondaryId = undefined;

    this.gameManagementService.nextPhase(this.queryIdentification);
  }
}

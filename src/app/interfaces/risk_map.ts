import { TerritoryInterface } from "./territory"

export interface RiskMap {
  territories: TerritoryInterface[]
  width: string
  height: string
  name: string
}

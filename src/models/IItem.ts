import { IGolfer } from "./IGolfer";
import { IBet } from "./IBet";
import { IPlayer } from "./IPlayer";
import { ITournament } from "./ITournament";
import { IEvent } from "./IEvent";
import { IEntry } from "./IEntry";
import { IPick } from "./IPick";
import { IFieldEntry } from "./IFieldEntry";
import { ISelectionEntry } from "./ISelectionEntry";
import { ISelectionPick } from "./ISelectionPick";
import { IYear } from "./IYear";
import { IEventStatus } from "./IEventStatus";
import { IEventResult } from "./IEventResult";
import { IEventDetails } from "./IEventDetails";

export type IItem = 
  IGolfer | 
  IBet | 
  IPlayer | 
  ITournament | 
  IEvent | 
  IEntry| 
  IPick | 
  IFieldEntry | 
  IEventResult |
  ISelectionEntry | 
  ISelectionPick |
  IYear |
  IEventStatus;


export interface OrderStage {
    id?:string,
    stageNumber?:string,
    stageName?:string,
    active?:string,
    startedOn?:Date,
    completed?:boolean,
    assignee?:string,
    reporter?:string,
    lastStage?:boolean,
    message?:string
}

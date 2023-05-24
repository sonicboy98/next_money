
interface Tag {
    ID:string;
    NAME:string;
    BACK_GROUND_COLOR:string;
    BORDER_COLOR:string;
    PAYMENT:number;
}

export default class Tags{
    
    tags:Tag[] = [
        {
            ID:'1',
            NAME:'給料',
            BACK_GROUND_COLOR:'rgba(54, 162, 235, 0.7)',//青
            BORDER_COLOR:'rgba(54, 162, 235, 1)',
            PAYMENT:0,
        },
        {
            ID:'2',
            NAME:'家賃',
            BACK_GROUND_COLOR:'rgba(255, 99, 132, 0.7)',//赤
            BORDER_COLOR:'rgba(255, 99, 132, 1)',
            PAYMENT:1,
        },
        {
            ID:'3',
            NAME:'食費',
            BACK_GROUND_COLOR:'rgba(75, 192, 192, 0.7)',//緑
            BORDER_COLOR:'rgba(75, 192, 192, 1)',
            PAYMENT:1,
        },
        {
            ID:'4',
            NAME:'その他',
            BACK_GROUND_COLOR:'rgba(153, 102, 255, 0.7)',//紫
            BORDER_COLOR:'rgba(153, 102, 255, 1)',
            PAYMENT:1,
        },

    ]

}
export interface Room {
    id: string;
    seqF: number;
    floorId: string;
    floorName:  string;
    listRoom: [
      {
        idr:  string;
        roomName: string;
        roomPeople: string;
        roomSubBed: string;
        roomType:string;
        roomView: string;
        listService: [
          {
              id:  string;
              serviceName: string;
              servicePrice: number;
              serviceAmount: number
          }
        ];
        seqR: number;
        pricePerDay: number;
        pricePerHoilday: number;
        priceDeposit: number;
      }
    ];
    listAsset:[
      {
        id: string;
        nameAsset: string;
      }
    ];
}

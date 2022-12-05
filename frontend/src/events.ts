export type AppEvents = {
  openModal: any
  openFundModal: OpenFundModal
  closeModal: any
  connectOrUpdatedUser: any
  propertyFounded: PropertyFunded
  openAddPropertyModal: any
  toast: Toast
  openUserDataModal: any
  dataUpdated: any;
  openUniversalLoader: any 
  closeUniversalLoader: any
  openMobileMenu: any
  closeMobileMenu: any
};

export enum ToastType {
  ERROR,
  INFO,
  SUCCESS,
  WARNING,
}

export interface OpenFundModal {
  id: number;
  price: number;
  funds: number;
}
export interface PropertyFunded {
  id: number;
  funds: number;
}

export interface Toast {
  message: string;
  type: ToastType;
}

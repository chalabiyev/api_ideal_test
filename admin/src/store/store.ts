import { create } from 'zustand';

export interface StoreState {
  PublicServicesModal: boolean;
  TourismModal: boolean;
  MobileModal: boolean;
  UtilityModal: boolean;
  ConsultingModal: boolean;
  BankModal: boolean;
  ShoppingModal: boolean;
  PublicServicesAlign: boolean;
  TourismAlign: boolean;
  MobileAlign: boolean;
  UtilityAlign: boolean;
  ConsultingAlign: boolean;
  BankAlign: boolean;
  ShoppingAlign: boolean;
  AiChat: boolean;
  AddUserModal1: boolean;
  videoStream: MediaStream | null; // video stream
  screenShareActive: boolean; // screen share active

  // login modal

  LoginInModalState: boolean;
  SetLoginModalState: (value: boolean) => void;

  // documents focus modal

  FocusDocumentModal: boolean;
  SetFocusDocumentModal: (value: boolean) => void;

  // documents container

  DocumentsContainer: boolean;
  SetDocmentsContainer: (value: boolean) => void;

  // documents click title handler

  DocumentModalTitle: string; //  string
  SetDocumentModalTitle: (value: string) => void;

  // history focus modal

  HistoryModal: boolean;
  SetHistoryModal: (value: boolean) => void;

  // payments modal

  PaymentsModal: boolean;
  SetPaymentsModal: (value: boolean) => void;
}

export interface StoreActions {
  toggleModal: (modalName: keyof StoreState, alignName: keyof StoreState) => void;
  closeAllModals: () => void;
  setAiChat: (value: boolean) => void;
  setAddUserModal1: (value: boolean) => void;

  setVideoStream: (stream: MediaStream | null) => void; // video streami ayarla
  toggleScreenShare: (isActive: boolean) => void; // toggle screen share
}

export const useStore = create<StoreState & StoreActions>((set) => ({
  // all services modals and alignments
  PublicServicesModal: false,
  TourismModal: false,
  MobileModal: false,
  UtilityModal: false,
  ConsultingModal: false,
  BankModal: false,
  ShoppingModal: false,
  PublicServicesAlign: false,
  TourismAlign: false,
  MobileAlign: false,
  UtilityAlign: false,
  ConsultingAlign: false,
  BankAlign: false,
  ShoppingAlign: false,

  // documents focus modal
  FocusDocumentModal: false,
  SetFocusDocumentModal: (value: boolean) => {
    set({ FocusDocumentModal: value });
  },

  // history  modal
  HistoryModal: false,
  SetHistoryModal: (value: boolean) => {
    set({ HistoryModal: value });
  },

  // payments modal
  PaymentsModal: false,
  SetPaymentsModal: (value: boolean) => {
    set({ PaymentsModal: value });
  },

  // documents container
  DocumentsContainer: false,
  SetDocmentsContainer: (value: boolean) => {
    set({ DocumentsContainer: value });
  },

  // documents click title handler
  DocumentModalTitle: '', // Initial value set to empty string
  SetDocumentModalTitle: (value: string) => {
    set({ DocumentModalTitle: value });
  },

  // login modal
  LoginInModalState: false,
  SetLoginModalState: (value: boolean) => {
    set({ LoginInModalState: value });
  },

  // other state variables
  AiChat: false,
  AddUserModal1: false,
  videoStream: null,
  screenShareActive: false,

  // toggleModal method
  toggleModal: (modalName, alignName) => {
    set((state) => {
      if (state[modalName] || state[alignName]) return {};
      const newState = { [modalName]: true };
      setTimeout(() => {
        set({ [alignName]: true });
      }, 200);
      return newState;
    });
  },

  // closeAllModals method
  closeAllModals: () => {
    set({
      PublicServicesModal: false,
      TourismModal: false,
      MobileModal: false,
      UtilityModal: false,
      ConsultingModal: false,
      BankModal: false,
      ShoppingModal: false,
      PublicServicesAlign: false,
      TourismAlign: false,
      MobileAlign: false,
      UtilityAlign: false,
      ConsultingAlign: false,
      BankAlign: false,
      ShoppingAlign: false,
    });
  },

  setAiChat: (value: boolean) => set({ AiChat: value }),

  setAddUserModal1: (value: boolean) => set({ AddUserModal1: value }),

  setVideoStream: (stream: MediaStream | null) =>
    set((state) => {
      if (stream && state.screenShareActive) {
        return { videoStream: stream, screenShareActive: false };
      }
      return { videoStream: stream };
    }),

  toggleScreenShare: (isActive: boolean) =>
    set((state) => {
      if (isActive && state.videoStream) {
        state.videoStream.getTracks().forEach((track) => track.stop());
        return { screenShareActive: true, videoStream: null };
      }
      return { screenShareActive: false };
    }),
}));

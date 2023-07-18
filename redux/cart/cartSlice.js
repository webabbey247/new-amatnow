import {createSlice} from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0,
    riderTips: 0,
    notes: '',
    discountID: '',
    orderID: '',
    referenceID: '',
    bankDetails: null,
    isBankTransfer: false,
    thirdPartyDetails: null,
    isThirdParty: false,
    showPaymentModal: false,
    showBankAccountModal: false,
  },

  reducers: {
    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
    addMenuCart: (state, action) => {
      const menuIndex = state.cartList.findIndex(
        item => item.restaurant_menu_id === action.payload.restaurant_menu_id,
      );
      if (menuIndex >= 0) {
        state.cartList[menuIndex].quantity = action.payload.quantity;
      } else {
        const menuItem = {...action.payload};
        state.cartList.push(menuItem);
      }
    },

    removeCartItem(state, action) {
      // console.log('hello slice', action.payload);
      const newCartList = state.cartList.filter(
        cartItem => cartItem.id !== action.payload,
      );
      state.cartList = newCartList;
      // console.log('new cart', newCartList);
    },

    clearCart(state) {
      state.cartList = [];
    },

    addRiderTips: (state, action) => {
      state.riderTips = action.payload;
    },

    addDeliveryNotes: (state, action) => {
      state.notes = action.payload;
    },

    addPromoCode: (state, action) => {
      state.discountID = action.payload;
    },

    setPaymentInfo: (state, action) => {
      state.orderID = action.payload.id;
      state.referenceID = action.payload.reference;
      state.cartTotalAmount = action.payload.total_in_naira;
    },

    setBankDetails: (state, action) => {
      state.bankDetails = action.payload;
      state.isThirdParty = false;
      state.isBankTransfer = true;
      state.showPaymentModal = true;
    },

    setThirdPartyDetails: (state, action) => {
      state.thirdPartyDetails = action.payload;
      state.isThirdParty = true;
      state.isBankTransfer = false;
      state.showPaymentModal = true;
    },

    resetPaymentModal: (state, action) => {
      state.showPaymentModal = false;
      state.isThirdParty = false;
      state.isBankTransfer = false;
    },

    reset: (state, action) => {
      state.showPaymentModal = false;
      state.showBankAccountModal = false;
    },
  },
});

export const {
  setCartList,
  addMenuCart,
  removeCartItem,
  clearCart,
  addRiderTips,
  addDeliveryNotes,
  addPromoCode,
  setPaymentInfo,
  setBankDetails,
  setThirdPartyDetails,
  resetPaymentModal,
  reset,
} = cartSlice.actions;
export const getCartList = state => state.cart;
export default cartSlice.reducer;

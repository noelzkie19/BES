import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { ActionWithPayload } from '../../../modules/auth'
import { IAbout, IAboutState, initialAboutState } from '../model/about'

export const actionTypes = {
    GetAbout: '[GetAbout] Action',
    SetAbout: '[SetAbout] Action',
  }

export const aboutReducer = persistReducer(
    {storage, key: 'about', whitelist: ['about']},
    (state: IAboutState = initialAboutState, action: ActionWithPayload<IAboutState>) => {
      switch (action.type) {
        case actionTypes.GetAbout: {
          const about = action.payload?.about
          return {about}
        }
        default:
          return state
      }
    }
  )
  

export const actions = {
    getAbout: () => ({type: actionTypes.GetAbout}),
    setAbout: (about: IAbout) => ({type: actionTypes.SetAbout, payload: {about}})
 }


export function* saga() {
    yield takeLatest(actionTypes.GetAbout, function* loginSaga() {
      yield put(actions.getAbout())
    })
  
    yield takeLatest(actionTypes.SetAbout, function* userRequested() {
      // @ts-ignore
      const getAbout = (state) => state.about;
      // @ts-ignore
      let about = yield select(getAbout)
      yield put(about)
    })
  }

  
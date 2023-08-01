import {
  createContext,
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { memo } from 'react'
import _ from 'lodash'

interface ModalProps {}

const ModalStateContext = createContext(null)
const ModalDispatchContext = createContext(null)

export const ModalContextProvider = ({
  children,
}: {
  children: ReactElement
}) => {
  debugger
  const initState = {
    open: false,
  }

  const reducer = (state, action) => {
    const newState = _.cloneDeep(state)
    switch (action.type) {
      case 'CLOSE':
        newState.open = false
        return newState
      case 'OPEN':
        newState.open = true
        return newState
      default:
        return newState
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)
  const memorizedState = useMemo(() => state, [state])
  return (
    <ModalStateContext.Provider value={memorizedState}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <Modal />
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  )
}
export const useModalState = () => {
  return useContext(ModalStateContext)
}
export const useModalDispatch = () => {
  return useContext(ModalDispatchContext)
}

const Modal = memo(() => {
  debugger
  const cancelButtonRef = useRef(null)

  const modalState = useContext(ModalStateContext)
  const modalDispatch = useContext(ModalDispatchContext)

  return (
    <Transition.Root show={modalState.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => modalDispatch({ type: 'CLOSE' })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start justify-center">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        {/*<p className="text-sm text-gray-500">*/}
                        {/*  Are you sure you want to deactivate your account? All*/}
                        {/*  of your data will be permanently removed. This action*/}
                        {/*  cannot be undone.*/}
                        {/*</p>*/}

                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="password"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => modalDispatch({ type: 'CLOSE' })}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => modalDispatch({ type: 'CLOSE' })}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
})

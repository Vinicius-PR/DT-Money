import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  function handleCloseDialog() {
    setIsOpenDialog(false)
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal handleCloseDialog={handleCloseDialog} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}

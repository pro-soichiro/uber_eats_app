// components
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { OrderButton } from './Button/OrderButton';


export const NewOrderConfirmDialog = ({onClickSubmit}) => (
  <Dialog open={true} maxWidth="xs">
    <DialogTitle>
      新規注文を開始しますか？
    </DialogTitle>

    <DialogContent>
      <p>
        test
      </p>
      <OrderButton onClick={onClickSubmit} >
        新規注文
      </OrderButton>
    </DialogContent>
  </Dialog>
)

import {useState, useRef} from 'react';
import {Center, AlertDialog, Heading, Text, Image} from 'native-base';
import { setWidth, setHeight } from '../../utils/helper';
import icons from '../../constants/icons';

const WaitTimerAlert = ({prepTIme}) => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Body py={5} justifyContent="center" alignItems="center">
            <Center
              w={setWidth(20)}
              h={setHeight(10)}
              bg="red.100"
              rounded="full"
              mb={3}>
              <Image
                width={setWidth(10)}
                height={setHeight(5)}
                source={icons.REDCLOCKICON}
                resizeMode="contain"
                alt="Red Clock"
              />
            </Center>
            <Heading
              textAlign="center"
              fontSize="16"
              lineHeight="24"
              color="black.500"
              fontWeight="500">
              This store has a long wait time
            </Heading>
            <Text
              textAlign="center"
              fontSize="12"
              lineHeight="20"
              color="grey.700"
              fontWeight="500">
              Delivery time for this store is {prepTIme} mins.
            </Text>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default WaitTimerAlert;

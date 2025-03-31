import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Stack,
  styled,
} from '@mui/material';

import { Typography } from '@mui/material';
import Label from '../components/Label';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const SplitView = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [perRowCardCount, setPerRowCardCount] = useState<number>(4);

  const LIST_VIEW_BOX_PADDING = 2;

  const countPerRowCard = () => {
    if (selectedEvent) {
      return 2;
    }
    return 4;
  };

  return (
    <AllEventViewBox>
      <ListViewBox fullSize={!selectedEvent} padding={LIST_VIEW_BOX_PADDING}>
        <Grid container spacing={1.5}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid
              item
              key={index}
              xs={selectedEvent ? 6 : 3} // 한줄에 4개 보여줄 때
            //   sx={{
            //     flexBasis: selectedEvent ? '50%' : '20%',
            //     maxWidth: selectedEvent ? '50%' : '20%',
            //   }} // 한줄에 5개 보여줄 때
            >
              <Card
                sx={{ height: '100%', maxHeight: '300px' }}
                onClick={() => setSelectedEvent(index.toString())}
              >
                <CardContent>
                  <Label color="info" htmlFor="label">
                    잠재고객
                  </Label>
                  <Stack sx={{ mt: 2 }}>
                    <Typography>카드 내용 11111</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
          <Pagination count={10} />
        </Stack>
      </ListViewBox>
      {selectedEvent && (
        <AnswerViewBox sx={{ backgroundColor: 'white' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button onClick={() => setSelectedEvent('')}>
              <IconButton>
                <Icon icon="mdi:arrow-left" />
              </IconButton>
            </Button>
            <Typography>Split View</Typography>
            <Button>
              {/* <IconButton>
                <Icon icon="mdi:arrow-right" />
              </IconButton> */}
            </Button>
          </Stack>
        </AnswerViewBox>
      )}
    </AllEventViewBox>
  );
};

export default SplitView;

const AllEventViewBox = styled(Box)({
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
});

const ViewBox = styled(Stack)({
  width: '50%',
  height: '100%',
});

const ListViewBox = styled(ViewBox, {
  shouldForwardProp: (prop) => prop !== 'fullSize',
})<{ fullSize: boolean; padding: number }>(({ theme, fullSize, padding }) => ({
  backgroundColor: '#D9D9D9',
  padding: theme.spacing(padding),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  width: fullSize ? '100%' : '50%',
}));

const AnswerViewBox = styled(ViewBox)({
  backgroundColor: 'white',
});

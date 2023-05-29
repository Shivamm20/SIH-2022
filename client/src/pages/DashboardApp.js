import { useContext } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { GlobalState } from '../GLobalState';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
// function createData(name, studentsTotal, studentOut) {
//   return {
//     name,
//     // calories,
//     // fat,
//     // carbs,
//     // protein,
//     // price,
//     studentsTotal,
//     studentOut,
//     history: [
//       {
//         district: 'Gorakhpur',
//         totalStudents: '11091700',
//         studentsDropped: 32121,
//       },
//       {
//         district: 'Kanpur',
//         totalStudents: '11091700',
//         studentsDropped: 3515111,
//       },
//     ],
//   };
// }
function Row(props) {
  const { row, arr } = props;
  const [open, setOpen] = React.useState(false);
  const districts = arr.filter((ele, index) => {
    return ele.state === row.state;
  });
  if (row.name !== districts[0].name) return null;
  let sumTotal = 0;
  let sumOut = 0;
  districts.forEach((ele) => {
    sumTotal += ele.students_total;
  });
  districts.forEach((ele) => {
    sumOut += ele.student_out;
  });
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.state}
        </TableCell>
        {/* <TableCell align="center">{row.}</TableCell> */}
        <TableCell align="center">{sumTotal}</TableCell>
        <TableCell align="center">{sumOut}</TableCell>
        {/* <TableCell align="center">{row.carbs}</TableCell>
        <TableCell align="center">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                District Wise Data
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">District</TableCell>
                    <TableCell align="right">Total Students</TableCell>
                    <TableCell align="right">Students Dropped</TableCell>
                    {/* <TableCell align="right">Amount</TableCell> */}
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {districts.map((historyRow) => (
                    <TableRow align="right" key={historyRow.id}>
                      <TableCell align="right" component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell align="right">{historyRow.students_total}</TableCell>
                      <TableCell align="right">{historyRow.student_out}</TableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData('Uttar Pradesh', 159, 6),
//   createData('Madhya Pradesh', 237, 9),
//   createData('Odisha', 262, 16),
//   createData('Madhya Pradesh', 305, 3),
//   createData('Himanchal Pradesh', 356, 16),
// ];
export default function DashboardApp() {
  const theme = useTheme();
  const state = useContext(GlobalState);
  const [districtData] = state.districtApi.districtData;
  console.log(districtData);

  function AdminLogin(){
    return (
      <>
        <div className="text-center">
        <Link to="/login" className="btn btn-primary">Admin LOGIN to view detailed data!! </Link>
        </div>
      </>
    );
  }
  function DistrictData({districtData}) {
    return (
      <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Total Students</TableCell>
                  <TableCell align="Center">Students Dropped</TableCell>
                  {/* <TableCell align="Center"></TableCell>
                   <TableCell align="Center"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody align="center">
                {districtData.map((row, index, arr) => (
                  <Row key={row.id} row={row} arr={arr} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
      </>
    );
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to The Vedas!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Students" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Students Migrated" total={13528} color="info" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Students" total={1723} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Students Dropped" total={2349} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 50, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gender Ratio"
              chartData={[
                { label: 'Active Girls', value: 4344 },
                { label: 'Dropout Girls', value: 5435 },
                { label: 'Active Boys', value: 1443 },
                { label: 'Dropout Boys', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={20} md={6} lg={8}>
            <AppConversionRates
              title="State Wise Education Stats(Dropout) "
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Andhra Pradesh', value: 400 },
                { label: 'Arunanchal Pradesh', value: 430 },
                { label: 'Assam', value: 448 },
                { label: 'Bihar', value: 470 },
                { label: 'Chattisgarh', value: 540 },
                { label: 'Goa', value: 580 },
                { label: 'Gujrat', value: 690 },
                { label: 'Harayana', value: 1100 },
                { label: 'Himanchal Pradesh', value: 1200 },
                { label: 'Jharkhand', value: 1380 },
                { label: 'Karnatak', value: 400 },
                { label: 'Kerala', value: 430 },
                { label: 'Madhya Pradesh', value: 448 },
                { label: 'Maharashtra', value: 400 },
                { label: 'Manipur', value: 430 },
                { label: 'Meghalaya', value: 448 },
                { label: 'Mizoram', value: 400 },
                { label: 'Nagaland', value: 430 },
                { label: 'Odisha', value: 448 },
                { label: 'Punjab', value: 400 },
                { label: 'Rajasthan', value: 430 },
                { label: 'Sikkim', value: 448 },
                { label: 'Tamil Nadu', value: 448 },
                { label: 'Telangana', value: 448 },
                { label: 'Tripura', value: 448 },
                { label: 'Uttarakhand', value: 448 },
                { label: 'Uttar Pradesh', value: 448 },
                { label: 'West Bengal', value: 448 },
                { label: 'Andaman and Nicobar', value: 448 },
                { label: 'Chandigarh', value: 448 },
                { label: 'Dadara and Nagar Haveli and Daman and Diu', value: 448 },
                { label: 'Delhi', value: 448 },
                { label: 'Jammu and Kashmir', value: 448 },
                { label: 'Ladhak', value: 448 },
                { label: 'Lakshadweep', value: 448 },
                { label: 'Puducherry', value: 448 },
              ]}
            />
          </Grid>
          <Grid item xs={20} md={6} lg={8}>
          {districtData.length===0?<AdminLogin/>:<DistrictData districtData={districtData}/>}
              </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="New Scholarships and Policies"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

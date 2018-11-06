import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// Icon
import HomeIcon from '@material-ui/icons/Home'
import RowingIcon from '@material-ui/icons/Rowing'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import ChartIcon from '@material-ui/icons/ShowChart'
import AccountIcon from '@material-ui/icons/AccountCircle'
import StoreIcon from '@material-ui/icons/Store'
import GroupStaffIcon from '@material-ui/icons/Group'
// Import Component
import AmPayment from './am_payment'
import AmDashboard from './am_dashboard'
import AmRevenue from './am_revenue'
import AmHome from './am_home'
import AmAccount from './am_account'
import { Route, Link } from 'react-router-dom'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    background: '#e1e1e4',
    padding: theme.spacing.unit * 3
  },
  listitem: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
  hoverListItem: {
    '&:hover': {
      background: 'white',
      color: 'blue'
    }
  }
})

class AmDrawer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false, titleApp: 'Welcome to your Dashboard' }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.onChangeViewContent = this.onChangeViewContent.bind(this)
  }
  onChangeViewContent (e, text) {
    this.setState({ titleApp: text })
  }
  handleDrawerOpen () {
    this.setState({ open: true })
  }
  handleDrawerClose () {
    this.setState({ open: false })
  }

  render () {
    const { classes, theme } = this.props
    const arrSidebar = ['Home', 'Payment', 'Revenue', 'DashBoard']
    const arrIcon = [<HomeIcon />, <RowingIcon />, <MoneyIcon />, <ChartIcon />]
    const arrToPathFirst = ['/admin/home', '/admin/payment', '/admin/revenue', '/admin/dashboard']
    const arrNavComFirst = [<AmHome />, <AmPayment />, <AmRevenue />, <AmDashboard />]
    const arrToPathSecond = ['/admin/account', '/admin/storeinfor', '/admin/groupstaff']
    // invidual account
    const arrInvPerson = ['Account', 'Store Info', 'Group Staff']
    const arrInvIcon = [<AccountIcon />, <StoreIcon />, <GroupStaffIcon />]
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              {this.state.titleApp}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List >
            {arrSidebar.map((text, index) => (
              <Link key={index} style={{ textDecoration: 'none' }} to={arrToPathFirst[index]} component={arrNavComFirst[0]}>
                <ListItem onClick={(e) => this.onChangeViewContent(e, text)} className={classNames(classes.hoverListItem)} button key={text}>
                  <ListItemIcon>{arrIcon[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {arrInvPerson.map((text, index) => (
              <ListItem onClick={(e) => this.onChangeViewContent(e, text)} className={classNames(classes.hoverListItem)} button key={text}>
                <ListItemIcon >{arrInvIcon[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>

            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/admin/home' component={AmHome} />
          <Route path='/admin/payment' component={AmPayment} />
          <Route path='/admin/revenue' component={AmRevenue} />
          <Route path='/admin/dashboard' component={AmDashboard} />
          <Route path='/admin/account' component={AmAccount} />
        </main>
      </div>
    )
  }
}

AmDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(AmDrawer)

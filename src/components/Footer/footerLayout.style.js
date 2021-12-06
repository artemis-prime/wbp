export default (theme) => ({
  footerGridContainer: {
    marginTop: theme.spacing(3)
  },

  logoAreaGridItem: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(3),
    },
  },
  navGridItem: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
    },
  },

  
  navOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  },
})

/*

 
  appStoreSectionHR: {
    margin: 0,
    marginBottom: theme.spacing(2),
    display: 'block',
    width: '100%',
    borderWidth: '0 0 1px 0',
    borderColor: theme.palette.divider,
  },
  appStoreOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appStoreTitle: {
    marginBottom: theme.spacing(0.5),
  },
  appStoreApple: {
    width: 110,
    paddingRight: theme.spacing(1),
  },
*/
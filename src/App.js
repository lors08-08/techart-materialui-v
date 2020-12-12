import React from "react";
import { Grid } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import BusinessIcon from "@material-ui/icons/Business";
import Paper from "@material-ui/core/Paper";
import StepContent from "@material-ui/core/StepContent";
import ButtonBase from "@material-ui/core/ButtonBase";

const images = [
  {
    url: "https://roadmap2050.report/static/files/photo-building.jpg",
    title: "Жилой дом",
    width: "40%",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkijfRNqjpy0Zp-qpTcPLWx4JLGcrZplTLw&usqp=CAU",
    title: "Гараж",
    width: "30%",
  }
];

const useStyles = makeStyles((theme) => ({
  stepper: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  mainTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: "28px",
    fontWeight: "600",
    color: "#6d6d6d",
  },
  buildIcon: {
    fontSize: "3rem",
    marginLeft: "15px",
    color: "#6d6d6d",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

function getSteps() {
  return [
    "Что будем строить?",
    "Количество этажей(число)",
    "Материал стен",
    "Длина стен (в метрах)",
  ];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown stepIndex";
  }
}

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="App">
      <Grid container>
        <Grid className={classes.mainTitle} item>
          Калькулятор цены конструкций{" "}
          <BusinessIcon className={classes.buildIcon} />
        </Grid>
        <Grid container>
          <Grid item xs={0} sm={2} />
          <Grid item xs={12} sm={8}>
            <div className={classes.stepper}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {/*<Typography>{getStepContent(index)}</Typography>*/}
                      <div className={classes.actionsContainer}>
                        <div>
                          <div className={classes.root}>
                            {images.map((image) => (
                              <ButtonBase
                                focusRipple
                                key={image.title}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                  width: image.width,
                                }}
                              >
                                <span
                                  className={classes.imageSrc}
                                  style={{
                                    backgroundImage: `url(${image.url})`,
                                  }}
                                />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                  <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    className={classes.imageTitle}
                                  >
                                    {image.title}
                                    <span className={classes.imageMarked} />
                                  </Typography>
                                </span>
                              </ButtonBase>
                            ))}
                          </div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </Paper>
              )}
            </div>
          </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

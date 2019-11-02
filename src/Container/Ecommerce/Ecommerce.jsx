import React, { Component } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import SideDrawer from "../../Component/SideDrawer/SideDrawer";
import BackDrop from "../../Component/BackDrop/BackDrop";
import SignUp from "../../Component/SignUp/SignUp";
import LogIn from "../../Component/LogIn/LogIn";
import Firebase from "../../Firebase/Firebase";
import Spinner from "../../Component/Spinner/Spinner";
import Profile from "../../Component/Profile/Profile";
import Explore from "../../Component/Explore/Explore";
import { Route, Switch, withRouter } from "react-router-dom";
import Modal from "../../Component/Modal/Modal";
import UserAds from "../../Component/UserAds/UserAds";
import CreateAd from "../../Component/CreateAd/CreateAd";
import Alert from "../../Component/Alert/Alert";

class Ecommerce extends Component {
  state = {
    openSideDrawer: false,

    signUp: {
      name: "",
      email: "",
      password: ""
    },

    logIn: {
      email: "",
      password: ""
    },

    user: {
      name: "",
      email: ""
    },

    signUpError: "",

    showSpinner: false,

    logInError: "",

    publicAds: [],

    showModal: false,

    modalInfo: {},

    userAds: [],

    createAd: {
      title: "",
      price: "",
      description: "",
      address: "",
      ph_num: "",
      img: ""
    },

    createAdError: "",
    loader: false,
    isSignIn: false,
    alert: null
  };

  componentDidMount() {
    this.props.history.push("/");
    this.setState({ loader: true });

    let user = { ...this.state.user };

    // Getting user info
    try {
      Firebase.isSignIn()
        .then(User => {
          user.name = User.displayName;
          user.email = User.email;

          this.setState({ user, isSignIn: true });

          this.fetchUserAds();
        })
        .catch(() => {
          console.log("not Signed In");
          this.setState({ isSignIn: false });
        });

      // Getting data from firestore
      Firebase.getPublicAds()
        .then(publicAds => {
          this.setState({ publicAds, loader: false });
        })
        .catch(er => console.log(er));
    } catch (e) {
      console.log(e);
    }
  }

  // Animation of SideDrawer
  openSideDrawer = () => {
    this.setState({ openSideDrawer: true });
  };
  closeSideDrawer = () => {
    this.setState({ openSideDrawer: false });
  };

  // Storing signUp values
  signUpChange = (e, type) => {
    let value = e.target.value;
    let signUp = { ...this.state.signUp };

    if (type === "name") {
      signUp.name = value;
    } else if (type === "email") {
      signUp.email = value;
    } else {
      signUp.password = value;
    }

    this.setState({ signUp });
  };

  // Storing logIn values
  logInChange = (e, type) => {
    let value = e.target.value;
    let logIn = { ...this.state.logIn };

    if (type === "email") {
      logIn.email = value;
    } else {
      logIn.password = value;
    }

    this.setState({ logIn });
  };

  // SignUp
  signUp = e => {
    e.preventDefault();

    if (
      this.state.signUp.name.trim() === "" ||
      this.state.signUp.email.trim() === "" ||
      this.state.signUp.password.trim() === ""
    ) {
      this.setState({
        signUpError: "Please fill all fields",
        alert: <Alert msg="Please fill all the fields" />
      });
      setTimeout(() => this.setState({ alert: null }), 6000);
    } else {
      this.setState({ showSpinner: true });

      let user = { ...this.state.user };

      Firebase.signUp(
        this.state.signUp.name,
        this.state.signUp.email,
        this.state.signUp.password
      )
        .then(User => {
          user.name = User.displayName;
          user.email = User.email;

          this.setState({
            user,
            showSpinner: false,
            isSignIn: true,
            alert: <Alert msg="You Signed Up" />
          });

          setTimeout(() => this.setState({ alert: null }), 6000);

          this.props.history.push("/");
        })
        .catch(er => {
          console.log(er);
          this.setState({ signUpError: er, showSpinner: false });
        });
    }
  };

  // LogIn
  logIn = e => {
    e.preventDefault();

    if (
      this.state.logIn.email.trim() === "" ||
      this.state.logIn.password.trim() === ""
    ) {
      this.setState({
        logInError: "Please fill all fields",
        alert: <Alert msg="Please fill all the fields" />
      });
      setTimeout(() => this.setState({ alert: null }), 6000);
    } else {
      this.setState({ showSpinner: true });

      let user = { ...this.state.user };

      Firebase.logIn(this.state.logIn.email, this.state.logIn.password)
        .then(User => {
          user.name = User.displayName;
          user.email = User.email;

          this.setState({
            user,
            showSpinner: false,
            isSignIn: true,
            alert: <Alert msg="You Logged In" />
          });

          setTimeout(() => this.setState({ alert: null }), 6000);

          this.props.history.push("/");

          this.fetchUserAds();
        })
        .catch(er => {
          console.log(er);
          this.setState({ logInError: er, showSpinner: false });
        });
    }
  };

  // SignOut
  signOut = () => {
    Firebase.signOut().then(() => {
      this.props.history.push("/");
      this.setState({
        isSignIn: false,
        alert: <Alert msg="You Signed Out" />,
        userAds: []
      });

      setTimeout(() => this.setState({ alert: null }), 6000);
    });
  };

  // PublicAd Details
  showPublicAdDetails = index => {
    let publicAds = [...this.state.publicAds];
    this.setState({ modalInfo: publicAds[index], showModal: true });
  };

  // UserAd Details
  showUserAdDetails = index => {
    let userAds = [...this.state.userAds];
    this.setState({ modalInfo: userAds[index], showModal: true });
  };

  closeAdDetails = () => {
    this.setState({ showModal: false });
  };

  // CreateAd change
  createAdChange = (e, type) => {
    let createAd = { ...this.state.createAd };

    if (type === "title") {
      createAd.title = e.target.value;
    } else if (type === "price") {
      createAd.price = e.target.value;
    } else if (type === "description") {
      createAd.description = e.target.value;
    } else if (type === "address") {
      createAd.address = e.target.value;
    } else if (type === "ph_num") {
      createAd.ph_num = e.target.value;
    }

    this.setState({ createAd });
  };

  // Storing image in firebase
  imgChange = e => {
    this.setState({ showSpinner: true });

    let file = e.target.files[0];

    let createAd = { ...this.state.createAd };
    console.log(file);

    Firebase.store(file)
      .then(url => {
        createAd.img = url;
        this.setState({ createAd, showSpinner: false });
      })
      .catch(er => {
        this.setState({ createAdError: er, showSpinner: false });
      });
  };

  // Submitting Ad
  submitAd = e => {
    e.preventDefault();

    let publicAds = [...this.state.publicAds];
    let userAds = [...this.state.userAds];

    let createAd = { ...this.state.createAd };
    let valid = true;
    // Validation
    for (let key in createAd) {
      if (createAd[key].trim() === "" && key !== "img") {
        valid = false;

        this.setState({ alert: <Alert msg="Please fill all the fields" /> });
        setTimeout(() => this.setState({ alert: null }), 6000);
        break;
      } else if (createAd["img"].trim() === "") {
        this.setState({ alert: <Alert msg="Please add an image" /> });
        setTimeout(() => this.setState({ alert: null }), 6000);

        valid = false;
        break;
      }
    }

    if (valid) {
      this.setState({ showSpinner: true, createAdError: "" });

      createAd.userName = this.state.user.name;

      Firebase.storeAd(createAd, this.state.user.email)
        .then(() => {
          publicAds.push(createAd);
          userAds.push(createAd);
          this.setState({
            publicAds,
            userAds,
            showSpinner: false,
            alert: <Alert msg="You have posted an Ad" />
          });

          this.props.history.push("/userads");

          setTimeout(() => this.setState({ alert: null }), 6000);

          console.log("Ad Stored");
        })
        .catch(er => {
          console.log(er);
          this.setState({ showSpinner: false });
        });
    } else {
      this.setState({ createAdError: "Please fill all the fields" });
    }
  };

  fetchUserAds() {
    Firebase.getUserAds(this.state.user.email)
      .then(userAds => this.setState({ userAds }))
      .catch(er => console.log(er));
  }

  render() {
    let backDrop = this.state.openSideDrawer ? (
      <BackDrop close={this.closeSideDrawer} />
    ) : null;

    return (
      <div>
        {this.state.alert}

        <NavBar openSideDrawer={this.openSideDrawer} />

        <SideDrawer
          openSideDrawer={this.state.openSideDrawer}
          closeSideDrawer={this.closeSideDrawer}
          isSignIn={this.state.isSignIn}
          signOut={this.signOut}
        />

        {backDrop}

        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Explore
                publicAds={this.state.publicAds}
                showDetails={this.showPublicAdDetails}
                loader={this.state.loader}
              />
            )}
          />

          <Route
            path="/signup"
            exact
            render={() => (
              <SignUp
                signUpChange={this.signUpChange}
                signUp={this.signUp}
                error={this.state.signUpError}
              />
            )}
          />

          <Route
            path="/login"
            exact
            render={() => (
              <LogIn
                logInChange={this.logInChange}
                logIn={this.logIn}
                error={this.state.logInError}
              />
            )}
          />

          <Route
            path="/profile"
            exact
            render={() => <Profile user={this.state.user} />}
          />

          <Route
            path="/userads"
            exact
            render={() => (
              <UserAds
                userAds={this.state.userAds}
                showDetails={this.showUserAdDetails}
              />
            )}
          />

          <Route
            path="/createad"
            exact
            render={() => (
              <CreateAd
                inputChange={this.createAdChange}
                imgChange={this.imgChange}
                error={this.state.createAdError}
                img={this.state.createAd.img}
                submitAd={this.submitAd}
              />
            )}
          />
        </Switch>

        {this.state.showModal ? (
          <div>
            <Modal info={this.state.modalInfo} close={this.closeAdDetails} />
            <BackDrop close={this.closeAdDetails} />
          </div>
        ) : null}

        {this.state.showSpinner ? (
          <div>
            <Spinner />
            <BackDrop />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Ecommerce);

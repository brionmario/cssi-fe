import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import createAppIcon from '../../assets/img/illustrations/create-app.svg'
import selectAppIcon from '../../assets/img/illustrations/select-app.svg'
import * as applicationActionCreators from '../../redux/actions/application-actions';
import * as modalActionCreators from '../../redux/actions/modal-actions';
import * as sessionActionCreators from '../../redux/actions/session-actions';
import _ from 'lodash';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components';
import {CustomButton as Button} from '../../elements'
import {CreateApplicationForm, SelectApplicationForm} from '../../forms';
import {navigate} from '../../services';

class NewSession extends Component {

  componentDidMount() {
    const {actions} = this.props;
    actions.applications.fetchApplications();
    actions.applications.fetchApplicationTypes();
    actions.applications.fetchApplicationGenres();
  }

  componentWillReceiveProps(nextProps) {
    const {selectedApplication} = this.props;
    if (selectedApplication && nextProps.selectedApplication) {
      if (!_.isEqual(selectedApplication, nextProps.selectedApplication)) {
        let searchParams = '?type=pre&app=' + nextProps.selectedApplication.id;
        navigate('questionnaire', searchParams)
      }
    }
  }

  openModal = (e) => {
    const {actions} = this.props;
    const {modalKey} = e.target.dataset;
    actions.modal.openModal({modalKey});
  };

  handleApplicationCreate = (e) => {
    const {actions} = this.props;
    const config = {
      title: 'Create New Application',
      button: 'Create Application',
      mode: 'create',
    };
    actions.applications.setApplicationViewConfig(config);
    this.openModal(e);
  };

  handleApplicationSelect = (e) => {
    const {actions} = this.props;
    const config = {
      title: 'Select Existing Application',
      button: 'Select Application',
      mode: 'select',
    };
    actions.applications.setApplicationViewConfig(config);
    this.openModal(e);
  };

  render() {
    const {
      actions, modal, viewConfig, applications, applicationTypes, applicationGenres
    } = this.props;

    let applicationOptions = null;

    if (applications) {
      applicationOptions = applications
        .map(app => (
          {value: app, label: app.name}
        ));
    }

    let applicationTypesOptions = null;

    if (applicationTypes) {
      applicationTypesOptions = applicationTypes
        .map(type => (
          {value: type, label: type.display_name_full}
        ));
    }

    let applicationGenreOptions = null;

    if (applicationGenres) {
      applicationGenreOptions = applicationGenres
        .map(genre => (
          {value: genre, label: genre.display_name}
        ));
    }

    return (
      <div className="main-content no-padding session-page">
        <Grid fluid>
          <Row>
            <div className="sub-header">

            </div>
          </Row>
          <div className="main-session-content with-top-padding">
            <Row>
              <Col md={6} mdOffset={3}>
                <div className="content-description text-center mb-4">
                  <h2>Create a New Testing Session</h2>
                  <h5 className="text-muted font-weight-light">Please select one of the options from bellow and proceed
                    with the session</h5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="grid-card-flex-container">
                  <div className="grid-card md mr-4 ml-4">
                    <div className="grid-card-thumbnail-container">
                      <div className="grid-card-thumbnail bg-white mb-1 pt-1 pr-2 pl-2 pb-1">
                        <img src={createAppIcon}/>
                      </div>
                    </div>
                    <div className="grid-card-content-container text-center">
                      <div className="grid-card-heading">Create Application</div>
                      <div className="grid-card-description">
                        <div className="main">Create a new application with custom metadata.</div>
                      </div>
                    </div>
                    <div className="grid-card-footer text-center">
                      <Button bsStyle="default" bsSize="sm" fill data-modal-key="create-application-modal" wd
                              onClick={this.handleApplicationCreate}>
                        Create Application
                      </Button>
                    </div>
                  </div>
                  <div className="grid-card md mr-4 ml-4">
                    <div className="grid-card-thumbnail-container">
                      <div className="grid-card-thumbnail bg-white mb-1 pt-1 pr-2 pl-2 pb-1">
                        <img src={selectAppIcon}/>
                      </div>
                    </div>
                    <div className="grid-card-content-container text-center">
                      <div className="grid-card-heading">Select Existing</div>
                      <div className="grid-card-description">
                        <div className="main">Select an application which is already being created.</div>
                      </div>
                    </div>
                    <div className="grid-card-footer text-center">
                      <Button bsStyle="default" bsSize="sm" fill data-modal-key="select-application-modal" wd
                              onClick={this.handleApplicationSelect}>
                        Select Application
                      </Button>
                    </div>
                  </div>
                </div>
                <Modal
                  modalKey="create-application-modal"
                  closeAction={actions.modal.closeModal}
                  modalState={modal.Modal}
                >
                  <ModalHeader title={viewConfig ? viewConfig.title : 'Create Application'}/>
                  <ModalBody>
                    <CreateApplicationForm
                      initialValues={{}}
                      config={viewConfig}
                      applicationTypes={applicationTypesOptions}
                      genreTypes={applicationGenreOptions}
                    />
                  </ModalBody>
                  <ModalFooter/>
                </Modal>
                <Modal
                  modalKey="select-application-modal"
                  closeAction={actions.modal.closeModal}
                  modalState={modal.Modal}
                >
                  <ModalHeader title={viewConfig ? viewConfig.title : 'Select Application'}/>
                  <ModalBody>
                    <SelectApplicationForm
                      config={viewConfig}
                      applications={applicationOptions}
                    />
                  </ModalBody>
                  <ModalFooter/>
                </Modal>
              </Col>
            </Row>
          </div>
        </Grid>
      </div>
    );
  }
}

const injectedPropTypes = {
  actions: PropTypes.shape({}),
};

NewSession.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    modal: state.modal,
    applications: state.applications.applications,
    selectedApplication: state.sessions.selectedApplication,
    applicationTypes: state.applications.applicationTypes,
    applicationGenres: state.applications.applicationGenres,
    newApplication: state.applications.newApplication,
    deletingApplication: state.applications.deletingApplication,
    viewConfig: state.applications.applicationViewConfig,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      modal: bindActionCreators(modalActionCreators, dispatch),
      applications: bindActionCreators(applicationActionCreators, dispatch),
      sessions: bindActionCreators(sessionActionCreators, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSession);

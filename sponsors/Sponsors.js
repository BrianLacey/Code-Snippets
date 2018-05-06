/* Sponsors container component in which the SponsorsForm component is inserted and the list of sponsors from the API GET call are displayed. */ 

import React, { Component } from "react";
import SponsorsForm from "./SponsorsForm";
import * as SponsorsService from "../../services/sponsors.service";
import WidgetGrid from "../widgets/WidgetGrid";
import JarvisWidget from "../widgets/JarvisWidget";
import PageHeader from "../PageHeader";
import headerObject from "../../constants/page-header.js";
import { connect } from "react-redux";
import { addSponsor } from "../../actions/sponsors";

class Sponsors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsors: []
    };
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    SponsorsService.readAll()
      .then(data => {
        this.setState({
          sponsors: data.items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.sponsors.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.sponsors.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.sponsors.concat(updatedFormData);
      }
      return {
        sponsors: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  onSelect(item, event) {
    this.setState({
      formData: item
    });
    this.props.onAddSponsor(item);
  }

  onCancel(event) {
    this.setState({
      formData: null
    });
  }

  onDelete() {
    const formData = this.state.formData;
    SponsorsService.del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.sponsors.filter(item => {
            return item._id !== formData._id;
          });
          return { sponsors: updatedItems };
        });
        this.onCancel();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const sponsorItem = this.state.sponsors.map(sponsor => {
      return (
        <div key={sponsor._id}>
          <li key={sponsor._id} onClick={this.onSelect.bind(this, sponsor)}>
            <h3>
              {sponsor.firstName} {sponsor.lastName} of {sponsor.companyName}
            </h3>
            <p>Email:{sponsor.email}</p>
            <p>Zip Code:{sponsor.zipCode}</p>
            <p>Phone #:{sponsor.phone}</p>
            <p>Web Address:{sponsor.companyUrl}</p>
            <p>Sponsor Type:{sponsor.sponsorType} </p>
          </li>
          <legend />
        </div>
      );
    });
    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              className="btn btn-ribbon"
              data-action="resetWidgets"
              data-title="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
              data-html="true"
            >
              <i className="fa fa-refresh" />
            </span>
          </span>
          <ol className="breadcrumb">
            <li>Home</li>
            <li>Sponsors</li>
          </ol>
        </div>
        <div id="content">
          <PageHeader
            pageHeaderName={headerObject.sponsorsCrud.pageHeader}
            subtitle={headerObject.sponsorsCrud.subTitle}
          />
          <div className="row">
            <WidgetGrid>
              <div className="col-sm-6">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-building" /> Sponsors Form
                    </span>
                  }
                >
                  <SponsorsForm
                    formData={this.state.formData}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                    onDelete={this.onDelete}
                  />
                </JarvisWidget>
              </div>

              <div className="col-sm-5">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-building" /> Sponsors List
                    </span>
                  }
                >
                  <div>{this.state.sponsors && <ul>{sponsorItem}</ul>}</div>
                </JarvisWidget>
              </div>
            </WidgetGrid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddSponsor: sponsor => {
    dispatch(addSponsor(sponsor));
  }
});

export default connect(null, mapDispatchToProps)(Sponsors);

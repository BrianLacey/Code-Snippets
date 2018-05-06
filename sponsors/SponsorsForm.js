import React, { Component } from "react";
import * as validationHelper from "../../helpers/validation.helper";
import * as SponsorsService from "../../services/sponsors.service";
// ... Code contributed by another team member goes here.

class SponsorsForm extends Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      sponsors: [],
      formData: formData,
      formValid: false
    };
    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({
      formData: formData
    });
  }

  convertPropsToFormData(props) {
    const sponsor = props.formData && props.formData._id ? props.formData : {};

    const initializedSponsor = {
      _id: sponsor._id || "",
      companyName: sponsor.companyName || "",
      firstName: sponsor.firstName || "",
      lastName: sponsor.lastName || "",
      email: sponsor.email || "",
      zipCode: sponsor.zipCode || "",
      phone: sponsor.phone || "",
      // ... Code contributed by another team member goes here.
      createDate: sponsor.createDate || "",
      updateDate: sponsor.updateDate || "",
      // ... Code contributed by another team member goes here.
    };

    let formData = {
      _id: {
        originalValue: initializedSponsor._id,
        value: initializedSponsor._id,
        valid: true,
        validation: {},
        touched: false
      },
      companyName: {
        originalValue: initializedSponsor.companyName,
        value: initializedSponsor.companyName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      firstName: {
        originalValue: initializedSponsor.firstName,
        value: initializedSponsor.firstName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      lastName: {
        originalValue: initializedSponsor.lastName,
        value: initializedSponsor.lastName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      email: {
        originalValue: initializedSponsor.email,
        value: initializedSponsor.email,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      zipCode: {
        originalValue: initializedSponsor.zipCode,
        value: initializedSponsor.zipCode,
        valid: true,
        validation: {
          required: true,
          number: true,
          minLength: 5,
          maxLength: 5
        },
        touched: false
      },
      phone: {
        originalValue: initializedSponsor.phone,
        value: initializedSponsor.phone,
        valid: true,
        validation: {
          required: true,
          number: true,
          minLength: 10,
          maxLength: 10
        },
        touched: false
      }
      // ... Code contributed by another team member goes here.
      ,
      sponsorType: {
        originalValue: initializedSponsor.sponsorType,
        value: initializedSponsor.sponsorType,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      createDate: {
        originalValue: initializedSponsor.createDate,
        value: initializedSponsor.createDate,
        valid: true,
        validation: {},
        touched: false
      },
      updateDate: {
        originalValue: initializedSponsor.updateDate,
        value: initializedSponsor.updateDate,
        valid: true,
        validation: {},
        touched: false
      },
      // ... Code contributed by another team member goes here.
    };
    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }

    return formData;
  }

  onSave(event) {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({
        formData: formData
      });
      return;
    }
    const that = this;
    let item = {
      companyName: this.state.formData.companyName.value,
      firstName: this.state.formData.firstName.value,
      lastName: this.state.formData.lastName.value,
      email: this.state.formData.email.value,
      phone: this.state.formData.phone.value,
      // ... Code contributed by another team member goes here.
      zipCode: this.state.formData.zipCode.value,
      sponsorType: this.state.formData.sponsorType.value,
      // ... Code contributed by another team member goes here.
    };
    if (this.state.formData._id.value.length > 0) {
      item.createDate = this.state.formData.createDate.value;
      item._id = this.state.formData._id.value;
      SponsorsService.update(item)
        .then(data => {
          item.updateDate = data.updateDate;
          that.props.onSave(item);
          this.setState({
            formValid: false
          });
        })

        .catch(error => {
          console.log(error);
        });
    } else {
      SponsorsService.create(item)
        .then(data => {
          that.props.onSave({
            ...item,
            _id: data.id,
            createDate: data.createDate,
            updateDate: data.updateDate
          });
          this.setState({
            formValid: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <legend>Please enter your information</legend>
          </div>
          <form>
            <fieldset className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="company-name">Id</label>
                <input
                  type="text"
                  name="id"
                  className="form-control"
                  value={this.state.formData._id.value}
                  disabled
                />
              </div>
            </fieldset>
            <fieldset className="row">
              <div
                className={
                  !this.state.formData.companyName.touched
                    ? "col-md-12 form-group"
                    : this.state.formData.companyName.touched &&
                      !this.state.formData.companyName.valid
                      ? "col-md-12 form-group has-error has-feedback"
                      : "col-md-12 form-group has-success has-feedback"
                }
              >
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  className="form-control"
                  value={this.state.formData.companyName.value}
                  placeholder="Company Name"
                  onChange={this.onChange}
                />
                {!this.state.formData.companyName.touched ? (
                  <span />
                ) : this.state.formData.companyName.touched &&
                !this.state.formData.companyName.valid ? (
                  <React.Fragment>
                    <i className="glyphicon glyphicon-remove form-control-feedback" />
                    <p className="text-danger">This field is required</p>
                  </React.Fragment>
                ) : (
                  <i className="glyphicon glyphicon-ok form-control-feedback" />
                )}
              </div>
            </fieldset>
            <fieldset className="row">
              <div
                className={
                  !this.state.formData.firstName.touched
                    ? "col-md-6 form-group"
                    : this.state.formData.firstName.touched &&
                      !this.state.formData.firstName.valid
                      ? "col-md-6 form-group has-error has-feedback"
                      : "col-md-6 form-group has-success has-feedback"
                }
              >
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={this.state.formData.firstName.value}
                  placeholder="First Name"
                  onChange={this.onChange}
                />
                {!this.state.formData.firstName.touched ? (
                  <span />
                ) : this.state.formData.firstName.touched &&
                !this.state.formData.firstName.valid ? (
                  <React.Fragment>
                    <i className="glyphicon glyphicon-remove form-control-feedback" />
                    <p className="text-danger">This field is required</p>
                  </React.Fragment>
                ) : (
                  <i className="glyphicon glyphicon-ok form-control-feedback" />
                )}
              </div>
              <div
                className={
                  !this.state.formData.lastName.touched
                    ? "col-md-6 form-group"
                    : this.state.formData.lastName.touched &&
                      !this.state.formData.lastName.valid
                      ? "col-md-6 form-group has-error has-feedback"
                      : "col-md-6 form-group has-success has-feedback"
                }
              >
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={this.state.formData.lastName.value}
                  placeholder="Last Name"
                  onChange={this.onChange}
                />
                {!this.state.formData.lastName.touched ? (
                  <span />
                ) : this.state.formData.lastName.touched &&
                !this.state.formData.lastName.valid ? (
                  <React.Fragment>
                    <i className="glyphicon glyphicon-remove form-control-feedback" />
                    <p className="text-danger">This field is required</p>
                  </React.Fragment>
                ) : (
                  <i className="glyphicon glyphicon-ok form-control-feedback" />
                )}
              </div>
            </fieldset>
            <fieldset className="row">
              <div
                className={
                  !this.state.formData.email.touched
                    ? "col-md-8 form-group"
                    : this.state.formData.email.touched &&
                      !this.state.formData.email.valid
                      ? "col-md-8 form-group has-error has-feedback"
                      : "col-md-8 form-group has-success has-feedback"
                }
              >
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.formData.email.value}
                  placeholder="Email"
                  onChange={this.onChange}
                />
                {!this.state.formData.email.touched ? (
                  <span />
                ) : this.state.formData.email.touched &&
                !this.state.formData.email.valid ? (
                  <React.Fragment>
                    <i className="glyphicon glyphicon-remove form-control-feedback" />
                    <p className="text-danger">
                      This field is requires a valid email address.
                    </p>
                  </React.Fragment>
                ) : (
                  <i className="glyphicon glyphicon-ok form-control-feedback" />
                )}
              </div>
            </fieldset>
            <fieldset className="row">
              <div
                className={
                  !this.state.formData.zipCode.touched
                    ? "col-md-4 form-group"
                    : this.state.formData.zipCode.touched &&
                      !this.state.formData.zipCode.valid
                      ? "col-md-4 form-group has-error has-feedback"
                      : "col-md-4 form-group has-success has-feedback"
                }
              >
                <label htmlFor="zip-code">Zip Code</label>
                <input
                  type="number"
                  name="zipCode"
                  className="form-control"
                  value={this.state.formData.zipCode.value}
                  placeholder="Zip Code"
                  onChange={this.onChange}
                />
                {!this.state.formData.zipCode.touched ? (
                  <span />
                ) : this.state.formData.zipCode.touched &&
                !this.state.formData.zipCode.valid ? (
                  <React.Fragment>
                    <i className="glyphicon glyphicon-remove form-control-feedback" />
                    <p className="text-danger">
                      This field is requires a 5 digit zip code.
                    </p>
                  </React.Fragment>
                ) : (
                  <i className="glyphicon glyphicon-ok form-control-feedback" />
                )}
              </div>
              <div
                className={
                  !this.state.formData.phone.touched
                    ? "col-md-6 form-group"
                    : this.state.formData.phone.touched &&
                      !this.state.formData.phone.valid
                      ? "col-md-6 form-group has-error has-feedback"
                      : "col-md-6 form-group has-success has-feedback"
                }
              >
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  value={this.state.formData.phone.value}
                  placeholder="eg. 0001112222"
                  onChange={this.onChange}
                />
                {!this.state.formData.phone.touched ? (
                  <span />
                ) : this.state.formData.phone.touched &&
                !this.state.formData.phone.valid ? (
                  <React.Fragment>
                    <i className="glyphicon glyphicon-remove form-control-feedback" />
                    <p className="text-danger">
                      This field is requires a 10 digit phone number.
                    </p>
                  </React.Fragment>
                ) : (
                  <i className="glyphicon glyphicon-ok form-control-feedback" />
                )}
              </div>
            </fieldset>

            {/* ... Code contributed by another team member goes here. */}

            <fieldset className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="phone">Create Date</label>
                <input
                  type="text"
                  name="create-date"
                  className="form-control"
                  value={this.state.formData.createDate.value}
                  onChange={this.onChange}
                  disabled
                />
              </div>
              <div className="col-md-12 form-group">
                <label htmlFor="phone">Update Date</label>
                <input
                  type="text"
                  name="update-date"
                  className="form-control"
                  value={this.state.formData.updateDate.value}
                  onChange={this.onChange}
                  disabled
                />
              </div>
            </fieldset>
            {/* ... Code contributed by another team member goes here. */}
            <div className="form-actions">
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Save"
                    onClick={this.onSave}
                  />
                  <input
                    type="button"
                    className="btn"
                    value="Cancel"
                    onClick={this.props.onCancel}
                  />
                  {this.state.formData._id.value && (
                    <input
                      type="button"
                      className="btn btn-danger"
                      value="Delete"
                      onClick={() => this.props.onDelete(this.state.formData)}
                    />
                  )}
                </div>
              </div>
            </div>
            <p />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default SponsorsForm;

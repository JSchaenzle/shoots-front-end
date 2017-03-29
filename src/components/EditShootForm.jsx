import React from 'react';
import moment from 'moment';

export default class EditShootForm extends React.Component {

  constructor() {
    super();
    this.formattedDate = this.formattedDate.bind(this);
    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.handleCompletedChanged = this.handleCompletedChanged.bind(this);
  }

  formattedDate() {
    let date = moment.utc(this.props.date);
    let result = date.format("YYYY-MM-DD");
    return result;
  }

  handleDateChanged(event) {
    let date = event.target.valueAsDate;
    let dateStr = moment(date).utc().format();
    this.props.onDetailChanged({date: dateStr});
  }

  numberDetailChangedHandler(stateKey) {
    return (event) => {
      let updatedValue = Number(event.target.value);
      this.props.onDetailChanged({[stateKey]: updatedValue});
    };
  }

  stringDetailChangedHandler(stateKey) {
    return (event) => {
      this.props.onDetailChanged({[stateKey]: event.target.value});
    };
  }

  handlePriceChanged(event) {
    let price = Number(event.target.value);
    this.props.onDetailChanged({price: price});
  }

  handleCompletedChanged(event) {
    const completed = event.target.checked;
    this.props.onDetailChanged({completed: completed});
  }

  render() {
    return (
      <div>
        <section>
          <label>
            Client Name:
            <input type="text" value={this.props.name} onChange={this.stringDetailChangedHandler("name")} disabled={this.props.completed}></input>
          </label>
        </section>
        <section>
          <label>
            Shoot Date:
            <input type="date" value={this.formattedDate()} onChange={this.handleDateChanged} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label htmlFor="priceField">Price:</label>
          <input type="number" id="priceField" value={this.props.price} onChange={this.numberDetailChangedHandler("price")} disabled={this.props.completed}></input>
        </section>

        <section>
          <label>
            Miles Traveled:
            <input type="number" value={this.props.milesTraveled} onChange={this.numberDetailChangedHandler("milesTraveled")} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label>
            Time Shooting:
            <input type="number" value={this.props.hoursShooting} onChange={this.numberDetailChangedHandler("hoursShooting")} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label>
            Time Editing:
            <input type="number" value={this.props.hoursEditing} onChange={this.numberDetailChangedHandler("hoursEditing")} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label>
            Shoot Completed:
            <input type="checkbox" checked={this.props.completed} onChange={this.handleCompletedChanged}></input>
          </label>
        </section>

      </div>
    )
  }
}

EditShootForm.propTypes = {
  onDetailChanged: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  price: React.PropTypes.number.isRequired,
  completed: React.PropTypes.bool.isRequired,
  milesTraveled: React.PropTypes.number.isRequired,
  hoursShooting: React.PropTypes.number.isRequired,
  hoursEditing: React.PropTypes.number.isRequired,
}

EditShootForm.defaultProps = {
  name: "",
}


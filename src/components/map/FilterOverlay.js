import React, {Component} from 'react';

import {
  Dimensions,
  View,
  ScrollView,
  Text,
  Platform,
  Picker,
} from 'react-native';
import {Button, Slider, CheckBox, Overlay} from 'react-native-elements';

import androidUI from '../../styles/ui.android.style.js';
import iosUI from '../../styles/ui.ios.style.js';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

class FilterOverlay extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'ios') {
      this.styles = iosUI;
    } else {
      this.styles = androidUI;
    }

    this.state = {
      selectedType: this.props.placeType,
      selectedRadius: this.props.radius,
      openChecked: this.props.checkOpen,
    };

    this.types = [
      'airport',
      'amusement_park',
      'aquarium',
      'art_gallery',
      'atm',
      'bakery',
      'bank',
      'bar',
      'beauty_salon',
      'bowling_alley',
      'bus_station',
      'cafe',
      'campground',
      'casino',
      'cemetery',
      'church',
      'city_hall',
      'doctor',
      'gas_station',
      'hospital',
      'library',
      'lodging',
      'movie_theater',
      'museum',
      'night_club',
      'park',
      'parking',
      'police',
      'restaurant',
      'rv_park',
      'shopping_mall',
      'spa',
      'stadium',
      'store',
      'subway_station',
      'supermarket',
      'taxi_stand',
      'tourist_attraction',
      'train_station',
      'zoo',
    ];
  }

  onCheckedOpen = () => {
    this.setState(prevState => ({openChecked: !prevState.openChecked}));
  };

  resetFilter = () => {
    this.props.onSetFilter(1500, 'tourist_attraction', false);
  };

  render() {
    return (
      <Overlay
        isVisible
        animated
        animationType="fade"
        overlayStyle={[
          this.styles.overlayContainer,
          {height: 'auto', minHeight: '75%'},
        ]}>
        <>
          <View style={[this.styles.container]}>
            <View style={this.styles.overlayButtonsTop}>
              <Button
                onPress={() =>
                  this.props.onSetFilter(1500, 'tourist_attraction', false)
                }
                buttonStyle={this.styles.resetFilter}
                titleStyle={this.styles.resetTitle}
                title=" Clear all filters"
                icon={<Icon name="times" size={14} color="#fff" />}
              />
              <Button
                onPress={() => this.props.onPressFilter()}
                buttonStyle={this.styles.closeButton}
                icon={<Icon name="times" size={24} color="#110b84" />}
              />
            </View>

            <View style={{marginBottom: 16}}>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={[this.styles.heading2, {marginBottom: 8}]}>
                  Type of place:{' '}
                </Text>
                {/* <Text style={this.styles.radiusValue}>
                {this.state.selectedType.replace(/_/g, ' ')}
              </Text> */}
              </View>
              <Picker
                selectedValue={this.state.selectedType}
                onValueChange={newSelectedType =>
                  this.setState({selectedType: newSelectedType})
                }
                lineColor={'red'}
                itemStyle={this.styles.pickerItem}>
                {this.types.map((type, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={type.replace(/_/g, ' ')}
                      value={type}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={{marginBottom: 16}}>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={this.styles.heading2}>Radius: </Text>
                <Text style={this.styles.radiusValue}>
                  {this.state.selectedRadius}m.
                </Text>
              </View>

              <Slider
                value={this.state.selectedRadius}
                maximumValue={2000}
                minimumValue={200}
                step={100}
                thumbTintColor={'#182ac1'}
                minimumTrackTintColor={'#110b84'}
                maximumTrackTintColor={'#e4e4e4'}
                onValueChange={newRadius => {
                  const chosenRadius = Math.floor(newRadius);

                  this.setState({selectedRadius: chosenRadius});
                }}
              />
            </View>
            <CheckBox
              center
              title="Show only opened places?"
              checkedIcon="check-square"
              uncheckedIcon="check-square"
              checkedColor="#182ac1"
              uncheckedColor="#e4e4e4"
              containerStyle={this.styles.checkBoxFilter}
              textStyle={{color: '#020029'}}
              onPress={this.onCheckedOpen}
              checked={this.state.openChecked}
            />
          </View>
          <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Button
              title="Set filter"
              onPress={() =>
                this.props.onSetFilter(
                  this.state.selectedRadius,
                  this.state.selectedType,
                  this.state.openChecked,
                )
              }
              buttonStyle={this.styles.bigButton}
              titleStyle={this.styles.primaryFormButtonTitle}
            />
          </View>
        </>
      </Overlay>
    );
  }
}

export default FilterOverlay;

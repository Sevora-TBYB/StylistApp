import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onSelect: (value: string) => void;
  containerStyle?: any;
  dropdownStyle?: any;
  labelStyle?: any;
  error?: string;
  isDarkMode?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onSelect,
  containerStyle,
  dropdownStyle,
  labelStyle,
  error,
  isDarkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownHeight] = useState(new Animated.Value(0));

  const selectedOption = options.find(option => option.value === value);

  const dynamicStyles = {
    dropdown: {
      backgroundColor: isDarkMode ? styles.dropdownDark.backgroundColor : styles.dropdownLight.backgroundColor,
      borderColor: isDarkMode ? styles.dropdownDark.borderColor : styles.dropdownLight.borderColor,
      color: isDarkMode ? styles.dropdownDark.color : styles.dropdownLight.color,
    },
    label: {
      color: isDarkMode ? styles.labelDark.color : styles.labelLight.color,
    },
    arrow: {
      color: isDarkMode ? '#FFFFFF' : '#737378',
    },
    optionsContainer: {
      backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF',
      borderColor: isDarkMode ? '#3A3A3C' : '#DBDBDB',
    },
    optionText: {
      color: isDarkMode ? '#FFFFFF' : '#424245',
    },
  };

  const toggleDropdown = () => {
    const optionHeight = 48; // Each option has minHeight: 48
    const maxHeight = 200; // Maximum dropdown height
    const totalOptionsHeight = options.length * optionHeight;
    const containerPadding = 16; // paddingBottom + extra space
    const calculatedHeight = Math.min(totalOptionsHeight, maxHeight) + containerPadding;
    const toValue = isOpen ? 0 : calculatedHeight;
    
    console.log('Options count:', options.length, 'Calculated height:', calculatedHeight);
    
    Animated.timing(dropdownHeight, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    toggleDropdown();
  };

  const renderArrow = () => {
    return (
      <Text style={[styles.arrow, { color: dynamicStyles.arrow.color }]}>
        {isOpen ? '▲' : '▼'}
      </Text>
    );
  };

  const renderOption = ({ item, index }: { item: DropdownOption; index: number }) => (
    <TouchableOpacity
      style={[styles.option, { 
        backgroundColor: dynamicStyles.optionsContainer.backgroundColor,
        borderBottomColor: isDarkMode ? '#3A3A3C' : '#F0F0F0',
        borderBottomWidth: index === options.length - 1 ? 0 : 1, // Remove border for last item
      }]}
      onPress={() => handleSelect(item.value)}
    >
      <Text style={[styles.optionText, { color: dynamicStyles.optionText.color }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, dynamicStyles.label, labelStyle]}>{label}</Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.dropdown,
          dynamicStyles.dropdown,
          dropdownStyle,
          error && styles.errorBorder,
          isOpen && styles.dropdownOpen
        ]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.dropdownText,
          { color: selectedOption ? dynamicStyles.dropdown.color : '#737378' }
        ]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {renderArrow()}
      </TouchableOpacity>

      {/* Floating Options List */}
      <Animated.View
        style={[
          styles.optionsContainer,
          dynamicStyles.optionsContainer,
          {
            height: dropdownHeight,
            opacity: dropdownHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }
        ]}
      >
        <FlatList
          data={options}
          renderItem={({ item, index }) => renderOption({ item, index })}
          keyExtractor={(item) => item.value}
          showsVerticalScrollIndicator={true}
          style={styles.optionsList}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          bounces={false}
        />
      </Animated.View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 1000,
  },
  label: {
    fontSize: 14,
    color: '#424245',
    marginBottom: 4,
    fontWeight: '500',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#424245',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
    overflow: 'hidden',
    paddingBottom: 8,
  },
  optionsList: {
    flexGrow: 1,
    paddingBottom: 4,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    minHeight: 48,
  },
  optionText: {
    fontSize: 16,
    color: '#424245',
  },
  errorBorder: {
    borderColor: '#FF3B30',
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 20,
  },
  // Light mode colors
  dropdownLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DBDBDB',
    color: '#424245',
  },
  labelLight: {
    color: '#424245',
  },
  // Dark mode colors
  dropdownDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
    color: '#FFFFFF',
  },
  labelDark: {
    color: '#FFFFFF',
  },
});

export default CustomDropdown;

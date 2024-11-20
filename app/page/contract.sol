// pragma solidity ^0.8.0;

contract SensorData {

  // Define data structure for each sensor reading
  struct Reading {
    uint256 n;
    uint256 p;
    uint256 k;
    uint256 temperature;
    uint256 humidity;
    uint256 ph;
    uint256 rainfall;
  }

  // Array to store sensor readings
  Reading[] public readings;

  // Function to submit sensor data
  function submitData(
    uint256 n,
    uint256 p,
    uint256 k,
    uint256 temperature,
    uint256 humidity,
    uint256 ph,
    uint256 rainfall
  ) public {
    // Create a new Reading object
    Reading memory newReading = Reading(n, p, k, temperature, humidity, ph, rainfall);

    // Add the new reading to the array
    readings.push(newReading);
  }

  // Function to get the number of readings stored
  function getReadingCount() public view returns (uint256) {
    return readings.length;
  }

  // Function to get a specific reading by index (be cautious with bounds checking)
  function getReading(uint256 index) public view returns (Reading memory) {
    return readings[index];
  }
}
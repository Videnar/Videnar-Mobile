import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

function MomentAgo({ createdAt }) {
  const [timeAgo, setTimeAgo] = useState('');

  const DATE = new Date(createdAt && createdAt.toDate());

  useEffect(() => {
    fetchTimeAgo(DATE);
  });

  const fetchTimeAgo = (date) => {
    const timeAgoFromMoment = moment(date).fromNow();
    setTimeAgo(timeAgoFromMoment.toString());
  };

  return (
    <View>
      <Text>{timeAgo}</Text>
    </View>
  );
}

export default MomentAgo;

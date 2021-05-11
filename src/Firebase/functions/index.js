const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.pushNotificationToDevice = functions.firestore
  .document('/questions/{qId}/answers/{ansId}')
  .onCreate((snap, context) => {
    const questionId = context.params.qId;
    const answerSnap = snap.data();
    const userName = answerSnap.userDisplayName;
    const answererId = answerSnap.userID;
    console.log('Question Id ---> ', questionId);
    console.log('Snapshot data', userName);

    const sendNotification = async (questionID) => {
      const question = await admin
        .firestore()
        .collection('questions')
        .doc(questionID)
        .get();
      if (question) {
        const questionData = await question.data();
        const questioerId = await questionData.userID;
        if (questioerId !== answererId) {
          const questionerDeviceToken = await questionData.deviceToken;
          console.log('Device Token received ---> ', questionerDeviceToken);
          const message = {
            notification: {
              title: 'Videnar',
              body: `${userName} answered on your Question`,
            },
            data: {
              msgType: 'question',
              questionId: questionId,
            },
            android: {
              notification: {
                sound: 'default',
              },
            },
            token: questionerDeviceToken,
          };
          const response = await admin.messaging().send(message);
          console.log('Response ---> ', response);
        }
      }
    };
    sendNotification(questionId);
  });

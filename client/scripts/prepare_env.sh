VARIABLE_NAME="REACT_APP_IP"
ENV_PATH=.env
LOCAL_IP=$(ipconfig getifaddr en0)

if [[ ! $(grep -r $VARIABLE_NAME $ENV_PATH) ]]
then
    echo "$VARIABLE_NAME=$LOCAL_IP" >> $ENV_PATH
fi

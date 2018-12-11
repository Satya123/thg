   this.setState({ loaded : true }, () =>
        {
                        debugger;
                    console.log(resToken);
                    
                    fetch('https://appdev.transparenthealth.co/api/appointments/280400',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Token':'a29a1cae0e67f12c9452bd0289bf677ba9ef0d9da10fd06e14169c85da0282df'
                },
                body: JSON.stringify(
                {
              
                            "appointmentSchedule":{
                            "dates": ["12/30/2018","12/25/2018"],
                            "timeZone": "Asia/Kolkata",
                            "times": ["20:10","09:15"]},
                            "appointmentType": "Vision",
                            "dependentID": "280401",
                            "providerAddress": "87 H ",
                            "providerName": "Ankleshwar",
                            "providerOption": "Enter Preferred Provider",
                            "providerPhone": "7503732194",
                            "schedulingNote": "Hi",
                            "visitReason": "Hi"

})
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                     debugger;
                        console.log(responseJsonFromServer.data.status);
                if (responseJsonFromServer.data.status === '1') {
                          console.log(responseJsonFromServer.data.data);
                          this.setState({ loaded: false });
                          alert("Your appointment request is submitted successfully");
                           Actions.Appointments({isRequestAppointment:true})
                        }
                        else {
                          debugger;
                          
                            this.setState({ loaded: false });
                            console.log(responseJsonFromServer.data.message);
                            if (responseJsonFromServer.data.message === 'Invalid date time provided.'){
                               this.state.appointmentDateOne = '',
                               this.state.appointmentTimeOne = '',
                               this.state.arrDate = [],
                               this.state.arrTime = [],
                                 this.defaultDateTime()
                            }
                        }


                
                

            }).catch((error) =>
            {
                console.error(error);
                  alert(error);
                this.setState({ loaded : false});
            });
        });
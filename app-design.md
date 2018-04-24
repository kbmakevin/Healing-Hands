# WEB-APP DESIGN
## app module
- alert
- home- register
- login
- app.routing
- emergency-alerts (diff view rendered dependent on user.type)
- symptom-checker
- symptom-checker.service
- user.service

## authentication module
- authentication.service
- auth.guard
- role.guard

## patients module
- patients-list
- patients-details
- patient-motivations (patients can see motivation sent by ANY nurse)
---
    patients-list (only accessible by nurses)
        list all patients in tabular format
            clicking view details brings to patient-details for the SELECTED patient

        patients-details
            as nurse:
                create motivation
                    toggleable form

            as patient:
                update email/full name?                

            as either one:
                create vital information for THIS patient
                    toggleable form
    
                read profile information
                    full name/email
    
                list/read vital information for SELECTED patient
                    in tabular format

    emergency-alerts
        as nurse:
            read/list ALL emergency alerts received from ANY patient

        as patient:
            create emergency alert for a SELECTED nurse sent from THIS patient

    patient-motivations
        patient can read/list all motivations
            if simple tip, read string
            if url, clickable link to a video/game on another website

---
# WEB APP REQUIRED FUNCTIONALITIES
1. user registration/login

2. as a registered nurse:
    1. create vital signs for SELECTED patient recorded by THIS nurse
    2. read patient vital signs for SELECTED patient recorded by ALL users
    3. create motivation for SELECTED patient sent by THIS nurse

3. as a registered patient:
    1. create emergency alert for a SELECTED nurse sent from THIS patient
    2. read ALL motivation sent to THIS patient
    3. create vital signs for THIS patient recorded by THIS patient
    4. access/use ML tool integrated with the web-app

***
 *Notes/Considerations:*

- emerg alert on separate view/component not toggleable form because need to query data from api (users who are nurses) to populate dropdown in the form, we only want to do for ngOnit--for new component, toggleable would need extra work to implement check if first time loading, etc. if dont check will have extra overhead. less beautiful design :).
    
- nurse doesn't need its own module because everthing it is doing is related to either patient, or one of the other modules.

- updates can be toggleable forms like create as well
    - only diff is need to populate the form with the current data when doing update

- we do not delete user accounts, nurses or patients, in this web app
    - this will be responsiblity of DBA who is on maintenance and operations team

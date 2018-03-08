[![](https://comsysto.github.io/poc-angular-form-validation-backend/doc/banner.svg)](https://github.com/comsysto/poc-angular-form-validation-backend)

# poc-angular-form-validation-backend

Proof of Concept of ServerSide Form Validation with i18n and Angular Frontend.

 * :sparkles: [poc-angular-form-validation-frontend](https://github.com/comsysto/poc-angular-form-validation-frontend)
 * :sparkles: **poc-angular-form-validation-backend**

&nbsp;

### Proof of Concept Outline

We want to achieve the following:

 * Our Backend should be usable via a Frontend like Angular.
 * Our Backend should be usable by other Services.
 * For both cases we need i18n error messages and an easy way to describe Form Validations.
 * We want separation of concerns for i18n - meaning: Backend translates backend stuff, Frontend translates frontend stuff.
 * We want to support translation platforms like https://phraseapp.com/ or https://crowdin.com/.
 


&nbsp;

### Backend Description


The Backend will provide: 

 * an endpoint to create *Tickets*.
 * an endpoint to describe the validation rules to the frontend.
 * i18n Form Validation Errors (for server side errors).

&nbsp;

*Tickets* have certain **Validation Rules** like:

| Property        | Validation Rule                         |
|-----------------|-----------------------------------------|
| **Id**          | Required, Pattern `[A-Z]{1-5}[-][0-9]+` |
| **Summary**     | Required                                |
| **Description** | -                                       |
| **Reporter**    | Min-Length 10                           |

&nbsp;

A valid Ticket accepted by the backend would look like this

```json
{
  "id": "CSTO-1620",
  "summary": "I need a new mail account",
  "description": "mailaddress should be foo@bar.oof",
  "reporter": "Jane Miller"
}
```

The **Validation Rule Information** provided by the backend for `locale=de` would look like so:

```json
{
  "id": {
    "type": "string",
    "validations": [
      { 
        "type": "pattern",
        "message": "Muss mit 1-5 Großbuchstaben beginnen, gefolgt von Bindestrich, gefolgt von Zahlen",
        "regex": "^[A-Z]{1-5}[-][0-9]+$"         
      }
    ]
  },
  "summary": {
    "type": "string",
    "validations": [
      { 
        "type": "required",
        "message": "Muss angegeben sein"       
      }
    ]
  },
  "description": {
    "type": "string",
    "validations": [ ]
  },  
  "reporter": {
    "type": "string",
    "validations": [
      { 
        "type": "min-length",
        "message": "Muss mindestens 10 Zeichen lang sein",
        "length": 10       
      }
    ]
  }
}
```

   
&nbsp;

### API Doc


**POST /api/tickets/**

TBD


&nbsp;

### Deployment

Deployed to heroku on master-branch Push

 * https://poc-angular-form-validation.herokuapp.com/


&nbsp;

### License

[MIT](./LICENSE) © [Bernhard Grünewaldt](https://github.com/clouless)

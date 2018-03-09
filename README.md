[![](https://comsysto.github.io/poc-angular-form-validation-backend/doc/banner.svg?v2)](https://github.com/comsysto/poc-angular-form-validation-backend)

# Backend

Proof of Concept of ServerSide Form Validation with i18n and Angular Frontend.

 * :sparkles: [Frontend](https://github.com/comsysto/poc-angular-form-validation-frontend) - [comsysto.github.io/poc-angular-form-validation-frontend/](https://comsysto.github.io/poc-angular-form-validation-frontend/)
 * :sparkles: **Backend** - [poc-angular-form-validation.herokuapp.com/](https://poc-angular-form-validation.herokuapp.com/)

&nbsp;

### Proof of Concept Outline

We want to achieve the following:

 * Our Backend should be usable via a Frontend like Angular.
 * Our Backend should be usable by other Services.
 * For both cases we need i18n error messages and an easy way to describe Form Validations.
 * We want separation of concerns for i18n - meaning:
   * Backend translates backend messages.
   * Frontend translates frontend messages.
 * We want to support translation platforms like https://phraseapp.com/ or https://crowdin.com/.
 * Use https://formatjs.io/ compatible Intl implementation e.g. [Intl MessageFormat](https://github.com/yahoo/intl-messageformat)
   * Cool thing is that [phraseapp supports **nested JSON and Intl/FormatJS pluralization**](https://phraseapp.com/docs/guides/formats/react-intl-nested-json/) like:
   * `'You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}'`


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
| **Id**          | Required, Pattern `[A-Z]{1,5}[-][0-9]+` |
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

The **Validation Rule Information** provided by the backend for `locale=de` would look like so (shortened):

```json
{
  "id": {
    "type": "string",
    "validations": [
      {
        "type": "pattern",
        "message": "Muss mit 1-5 Großbuchstaben beginnen, gefolgt von Bindestrich, gefolgt von Zahlen",
        "regex": "^[A-Z]{1,5}[-][0-9]+$"
      }
    ]
  }
}
```


&nbsp;

### API Doc


#### :cyclone: POST /api/tickets/

Create a ticket. Returns HTTP 204 on success and HTTP 400 on validation Error.

Valid Ticket with english locale:

```
curl -s -i -H "Accept-Language: en" \
     -H "Content-Type: application/json" \
     -X POST -d '{"id": "CSTO-1620", "summary": "I need a new mail account", "description": "foo", "reporter": "Jane Miller"}' \
     https://poc-angular-form-validation.herokuapp.com/api/tickets
```

Returns

```
HTTP/1.1 204 No Content
Content-Language: en
```

&nbsp;

Invalid Ticket with english locale:

```
curl -s -i -H "Accept-Language: en" \
     -H "Content-Type: application/json" \
     -X POST -d '{"id": "-1620", "summary": "I need a new mail account", "description": "foo", "reporter": "Jane Miller"}' \
     https://poc-angular-form-validation.herokuapp.com/api/tickets
```

Returns

```
HTTP/1.1 400 Bad Request
Content-Language: en
Content-Type: application/json; charset=utf-8

{"status":400,"message":"invalid ticket","errors":[{"field":"id","type":"pattern","message":"Must begin with 1-5 capital letters followed by a dash, followed by numbers."}]}
```

----

#### :cyclone: GET /api/tickets/validation_rules

Retuns the validation rules for creating a ticket in the language of requested locale.

With english messages:

```
curl -s -i -H "Accept-Language: en" https://poc-angular-form-validation.herokuapp.com/api/tickets/validation_rules
```

```json
{
  "id": {
    "type": "string",
    "validations": [
      {
        "type": "pattern",
        "message": "Must begin with 1-5 capital letters followed by a dash, followed by numbers",
        "regex": "^[A-Z]{1,5}[-][0-9]+$"
      }
    ]
  }
}
```

With german messages:

```
curl -s -i -H "Accept-Language: de" https://poc-angular-form-validation.herokuapp.com/api/tickets/validation_rules
```

```json
{
  "id": {
    "type": "string",
    "validations": [
      {
        "type": "pattern",
        "message": "Muss mit 1-5 Großbuchstaben beginnen, gefolgt von Bindestrich, gefolgt von Zahlen",
        "regex": "^[A-Z]{1,5}[-][0-9]+$"
      }
    ]
  }
}
```


----

#### :cyclone: GET /api/greetings

The Greetings endpoint works with the [`Accept-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) Request Header. The selected locale is communicated back with the `Content-Language` Response Header.

Greetings in english:

```
curl -s -i -H "Accept-Language: en" https://poc-angular-form-validation.herokuapp.com/api/greetings/
```

```json
HTTP/1.1 200 OK
Content-Language: en
Content-Type: application/json; charset=utf-8

{"status":200,"message":"Hello Good Day"}
```

&nbsp;

Greetings in german:

```
curl -s -i -H "Accept-Language: de" https://poc-angular-form-validation.herokuapp.com/api/greetings/
```

```json
HTTP/1.1 200 OK
Content-Language: de
Content-Type: application/json; charset=utf-8

{"status":200,"message":"Guten Tag! Wollen Sie das Schnitzel?"}
```

&nbsp;

Greetings for japanese (or any other unknown locale) default to english:

```
curl -s -i -H "Accept-Language: jp" https://poc-angular-form-validation.herokuapp.com/api/greetings/
```

```json
HTTP/1.1 200 OK
Content-Language: en
Content-Type: application/json; charset=utf-8

{"status":200,"message":"Hello Good Day"}
```

----

&nbsp;

### Deployment

Deployed to heroku on master-branch Push

 * https://poc-angular-form-validation.herokuapp.com/

Initially disable heroku node_modules cache:

```
heroku config:set NODE_MODULES_CACHE=false --app poc-angular-form-validation
```

&nbsp;


### Development

**Quickstart:**

```bash
https://github.com/comsysto/poc-angular-form-validation-backend
poc-angular-form-validation-backend
yarn install

yarn start
```

Now server is running on http://localhost:5000/

&nbsp;

**Run API-Tests:**

```
yarn test
```

![](https://comsysto.github.io/poc-angular-form-validation-backend/doc/api-tests-1.png)

![](https://comsysto.github.io/poc-angular-form-validation-backend/doc/api-tests-2.png)

&nbsp;

**Editor/IDE**

At best use [Visual Studio Code](https://code.visualstudio.com/) since it has great TypeScript support.

 * Do not forget to install https://github.com/editorconfig/editorconfig-vscode `ext install EditorConfig`.
 * Add to config `{ "files.trimTrailingWhitespace": true }`

&nbsp;

### License

[MIT](./LICENSE) © [Bernhard Grünewaldt](https://github.com/clouless)

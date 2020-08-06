# ics-service

Simple microservice for creating downloadable `.ics` events (work in progress)

### `GET /event`

#### Query Params

`title` - event title

`description` - event description

`start` - ISO start date

`end` - ISO end date

`reminders` - event alarms, following shortform time different specification `1 day`, `1d`, `12h`, `3w`, etc (see [`ms`](https://npm.im/ms) for more information)

> note: use `reminders` parameter multiple times for multiple reminders

... more coming soon

### Deploy Locally

#### Clone the Repo

```bash
$ git clone git@github.com:krismuniz/ics-service.git ics-service
```

#### Install dependencies

```bash
$ npm install
```

#### Start the server with a `PORT` environment variable (default port is `3000`)

```bash
$ PORT=3000 npm start
```

#### Get `.ics` event files

`http://localhost:3000/event?title=My%20Event&description=test&start=2020-08-14&end=2020-08-14&reminders=2d&reminders=1week&reminders=12h`

### License

[MIT](/LICENSE.md) © Kristian Muñiz

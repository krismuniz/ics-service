# ics-service

Simple microservice for creating downloadable `.ics` events (work in progress)

### `GET /event`

#### Query Params

`title` - string, event title

`description` - string, event description

`start` - ISO date string, start date

`end` - ISO date string, end date

`reminders` - string, event alarms, following shortform time different specification `1 day`, `1d`, `12h`, `3w`, etc (see [`ms`](https://npm.im/ms) for more information)

`download` - boolean, sets `Content-Disposition` header to `attachment; filename=${slugifiedTitle}.ics` to enable one-click download

> note: use `reminders` parameter multiple times for multiple reminders

... more coming soon

#### Example

http://localhost:3000/event?title=My%20Event&description=test&start=2020-08-14&end=2020-08-14&reminders=2d&reminders=1week&reminders=12h

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

### License

[MIT](/LICENSE.md) © Kristian Muñiz

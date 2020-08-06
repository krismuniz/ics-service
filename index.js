const { promisify } = require('util')

const express = require('express')
const bodyParser = require('body-parser')

const ics = require('ics')
const createEvent = promisify(ics.createEvent)

const ms = require('ms')

const parseISO = require('date-fns/parseISO')
const subMiliseconds = require('date-fns/subMilliseconds')
const slugify = require('@sindresorhus/slugify')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const asArray = (date, includeTime = false) => {
  const d = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  const t = [date.getHours(), date.getMinutes()]

  return includeTime ? d.concat(t) : d
}

app.get('/event', async (req, res) => {
  const payload = req.query

  if (
    !payload.title
    || !payload.start
    || !payload.end
  ) return res.status(400).send('Invalid.')

  const title = payload.title
  const description = payload.description || ''
  const start = parseISO(payload.start)
  const end = parseISO(payload.end)

  const reminders = typeof payload.reminders === 'string'
    ? payload.reminders.split(',')
    : (payload.reminders || [])

  const alarms = reminders.map((time) => {
    return {
      action: 'display',
      trigger: asArray(subMiliseconds(start, ms(time)), true)
    }
  })

  const event = await createEvent({
    title,
    description,
    start: asArray(start),
    end: asArray(end),
    startInputType: payload.endInputType || 'local',
    endInputType: payload.endInputType || 'local',
    productId: 'ics-service',
    alarms
  })

  if (payload.download) {
    res.setHeader('Content-Disposition', `attachment; filename=${slugify(title)}.ics`);
  }

  res.setHeader('Content-Type', 'text/calendar')
  res.send(event)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port ' + listener.address().port)
})

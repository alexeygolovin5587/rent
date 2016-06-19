from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from models import *
from time import ctime, strftime

import json
import datetime
import smtplib

from rent import settings


@csrf_exempt
def login(request):
    data = json.loads(request.body)

    res = dict()

    res['login'] = "failed"

    op = Operator.objects.filter(name=data['name'], password=data['password'])

    if len(op) > 0:
        res['login'] = "success"
        res['role'] = "operator"

        # register operator login history
        history = Operator_login_history()

        history.operator = op[0]
        history.datetime = strftime('%Y-%m-%d %H:%M:%S')
        history.success = True

        history.save()


    else:
        subs = Subscriber.objects.filter(name=data['name'], password=data['password'])

        if len(subs) > 0:
            res['login'] = "success"
            res['role'] = "subscriber"

            # register subscriber login history
            history = Subscriber_login_history()

            history.subscriber = subs[0]
            history.datetime = strftime('%Y-%m-%d %H:%M:%S')
            history.success = True

            history.save()

    res = json.dumps(res)

    return HttpResponse(res)


def getSubscribers(request):

    # get subscribers from opentact
    url = 'http://portal.opentact.org/api/users'
    contents = opentactAPI_GET(url, {})

    sub_opentact = dict()
    if contents.status_code == 200:
        sub_opentact = json.loads(contents.content)['entities']

    subscribers = Subscriber.objects.all()
    res = []

    for sub in subscribers:
        for opentact_sub in sub_opentact:
            if opentact_sub['user_id'] == sub.id:

                temp = {
                    "name": sub.name,
                    "email": sub.email,
                    "balance": sub.balance,
                    "pin": sub.pin,
                    "created_on": opentact_sub['created'],
                    "phone": sub.phone,
                    "status": sub.status
                }

                res.append(temp)
                break

    res = json.dumps(res)

    return HttpResponse(res)


def getPins(request):
    pins = Calling_card_pin.objects.all()

    res = []

    for pin in pins:
        temp = {
            "name": pin.name,
            "email": "",
            "created_on": pin.created_on.strftime('%Y-%m-%d %H:%M:%S'),
            "activated_on": pin.activated_on.strftime('%Y-%m-%d %H:%M:%S'),
            "value": pin.value,
            "balance": pin.balance
        }

        res.append(temp)

    res = json.dumps(res)


@csrf_exempt
def createSubscriber(request):

    res = {"result": "failed"}

    data = json.loads(request.body)

    url = 'http://portal.opentact.org/api/users'
    params = {
        "name": data['name'],
        "email": data['email'],
        "password": data['password']
    }

    contents = opentactAPI_POST(url, params)

    if contents.status_code == 200:
        sub_opentact = json.loads(contents.content)

        subscriber = Subscriber()
        subscriber.id = sub_opentact['entities']['user_id']
        subscriber.name = data['name']
        subscriber.email = data['email']
        subscriber.password = data['password']
        subscriber.create_on = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        subscriber.status = 1

        subscriber.save()

        # send_email("VOIP", data['email'], "Welcome to VOIP!", "You are added in VOIP app. <br/> Your username: %s <br/> Your password: %s" % (data['name'], data['password']))

        res['result'] = "success"

    return HttpResponse(json.dumps(res))


def opentactAPI_GET(url, data, scope="users"):

    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Authorization": getToken(scope)
    }

    contents = requests.get(url, params=data, headers=headers)

    return contents


def opentactAPI_POST(url, data, scope="users"):

    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Authorization": getToken(scope)
    }

    contents = requests.post(url, data=json.dumps(data), headers=headers)

    return contents


def getToken(scope="users"):
    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
    params = {
        "grant_type": "client_credentials",
        "app_uuid": "29366990-1cfa-11e6-9e5f-eb468a66e519",
        "app_secret": "0no5ej0L59jfTAASsI5rvb1TWZzeoGFKqnTRSkaITWlk51nqAzqoceAsYfO6",
        "scope": scope
    }

    token = requests.post("http://portal.opentact.org/api/token", data=json.dumps(params), headers=headers)

    token = json.loads(token.content)
    token = "%s %s" % (token['token_type'], token['access_token'])

    return token


def test(request):

    # url = 'http://portal.opentact.org/api/sms/send'
    # params = {"user_id":181, "text":"ppp"}

    # url = 'http://portal.opentact.org/api/info/daily-usage'
    # params_daily_usage = {"app_id": 115, "start": "2016-05-20", "end": "2016-05-21"}

    url = 'http://portal.opentact.org/api/getRates'
    params = {'userid': 173, "country": "Canada"}
    #contents_sms = opentactAPI_POST(url, params, "sms")

    contents = opentactAPI_GET(url, params)

    #status_code = contents.status_code
    #sub_opentact = json.loads(contents.content)['entities']

    return HttpResponse(contents)


def send_email(sender, recipient, subject, body):

    gmail_user = settings.GMAIL_USER
    gmail_pwd = settings.GMAIL_PASSWORD

    FROM = sender
    TO = recipient if type(recipient) is list else [recipient]
    SUBJECT = subject
    TEXT = body

    # Prepare actual message
    message = """\From: %s\nTo: %s\nSubject: %s\n\n%s
    """ % (FROM, ", ".join(TO), SUBJECT, TEXT)
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(gmail_user, gmail_pwd)
        server.sendmail(FROM, TO, message)
        server.close()
        print 'successfully sent the mail:\n' + message
        return True
    except:
        print "failed to send mail:\n" + message
        return False
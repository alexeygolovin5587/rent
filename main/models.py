from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Operator(models.Model):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    create_on = models.DateTimeField(null=True)
    balance = models.FloatField()
    support_email = models.CharField(max_length=255, null=True, blank=True)
    support_phone = models.CharField(max_length=255, null=True, blank=True)
    url = models.CharField(max_length=255, null=True, blank=True)

    status = models.BooleanField(default=True)

    class Meta:
        db_table = 'tbl_operator'


class Subscriber(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, null=True, blank=True)
    create_on = models.DateTimeField(null=True)
    balance = models.FloatField()
    pin = models.IntegerField(null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)

    status = models.IntegerField(default=0)

    class Meta:
        db_table = 'tbl_subscriber'


class Operator_login_history(models.Model):
    operator = models.ForeignKey('Operator')
    datetime = models.DateTimeField()
    success = models.BooleanField(default=False)

    class Meta:
        db_table = 'tbl_operator_login_history'


class Subscriber_login_history(models.Model):
    subscriber = models.ForeignKey('Subscriber')
    datetime = models.DateTimeField()
    success = models.BooleanField(default=False)

    class Meta:
        db_table = 'tbl_subscriber_login_history'


class Subscriber_login_history(models.Model):
    subscriber = models.ForeignKey('Subscriber')
    datetime = models.DateTimeField()
    success = models.BooleanField(default=False)

    class Meta:
        db_table = 'tbl_subscriber_login_history'


class Calling_card_pin(models.Model):
    name = models.CharField(max_length=255)
    operator = models.ForeignKey('Operator')
    created_on = models.DateTimeField()
    activated_on = models.DateTimeField(null=True)
    value = models.FloatField(null=True)
    balance = models.FloatField(null=True)

    class Meta:
        db_table = 'tbl_calling_card_pin'
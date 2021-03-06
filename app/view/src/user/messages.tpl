{% extends "../common/common.tpl" %}
{% block title %}未读消息{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
		{% set messages = newMessages %}
		{% set module %}
	    {% include '../common/messages-list.tpl' %}
		{% endset %}
		<div class="mb-3">
			{{ myPanel.init('新消息', module) }}
		</div>

		{% set messages = oldMessages %}
		{% set module %}
	    {% include '../common/messages-list.tpl' %}
		{% endset %}
		{{ myPanel.init('旧消息', module) }}
{% endblock %}
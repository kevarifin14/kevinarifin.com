---
layout: page
title: Archive
permalink: /archive
---
### Posts

{% for post in site.posts %}
[{{ post.date | date: "%B %-d, %Y" }} - {{ post.title }}]({{ post.permalink }})
{% endfor %}

### Thought Bytes

{% assign emails = site.thought_bytes | sort: 'date' | reverse %}
{% for email in emails %}
[{{ email.date | date: "%B %-d, %Y" }} - {{ email.title }}]({{ email.url }})
{% endfor %}


---
title: Subscribe
permalink: /subscribe
layout: page
---
Every Thursday, I send out my Thought Bytes newsletter, a collection of the most thought-provoking content I consumed
in the past week as well updates on new posts on Life in Bytes. If you'd like to check out the latest issue, you can find it [here]({{ site.thought_bytes[-1].url}}){:target='_blank'}. Subscribe below!

{% include mailchimp.html %}

<hr class='post-hr'>

<center>
<h4>Past Thought Bytes</h4>
{% for tb in site.thought_bytes reversed %}
<li id='archive'>
    <a href='{{ tb.permalink }}'>{{ tb.date | date: '%B %-d, %Y' }} - {{ tb.title }}</a>
</li>
{% endfor %}
</center>
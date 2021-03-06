'use strict';
const Service = require('egg').Service;

class TopicService extends Service {
  // 基于conditions条件，获取最近创建的话题
  async getTopics(conditions, sortConditions, limit = -1, offset = 0) {
    const query = this.ctx.model.Topic.find(conditions).sort(sortConditions).populate('user');
    if (offset) query.skip(offset);
    if (limit !== -1) query.limit(limit);
    const topics = await query;

    return await this._fillLastReply(topics);
  }

  async getNoReplyTopics(num) {
    const query = this.ctx.model.Topic.find({ reply_account: 0 }).sort({ created_time: -1 });
    query.limit(num);

    const topics = await query;
    return topics;
  }

  // 获取指定用户最近回复的话题（去重）
  async getReplyTopics(userId, limit = -1, offset = 0) {
    const replyTopicIds = await this.getReplyTopicIds(userId);
    const ids = [];
    for (const v of replyTopicIds) ids.push(v.toString());

    const allReplies = await this.ctx.model.Reply.find({ user: userId }).sort({ created_time: -1 });
    let currentOffset = 0;
    const result = [];

    for (let i = 0; i < allReplies.length && ids.length && (limit === -1 || result.length < limit); i++) {
      const tempReply = allReplies[i];
      if (ids.indexOf(tempReply.topic.toString()) !== -1) {
        const tempIndex = ids.indexOf(tempReply.topic.toString());
        ids.splice(tempIndex, 1);
        if (currentOffset >= offset) {
          // 可放入
          const tempTopic = await this.ctx.model.Topic.findById(tempReply.topic).populate('user');
          result.push(tempTopic);
        } else {
          currentOffset++;
        }
      }
    }
    return await this._fillLastReply(result);
  }

  async getReplyTopicIds(userId) {
    const replyTopicIds = await this.ctx.model.Reply.distinct('topic', { user: userId });
    return replyTopicIds;
  }

  async _fillLastReply(topics) {
    for (let i = 0; i < topics.length; i++) {
      const tempReplyTopic = topics[i];
      const lastReply = await this.ctx.model.Reply.findOne({ topic: tempReplyTopic.id }).sort({ created_time: -1 }).populate('user');
      if (lastReply) tempReplyTopic.last_reply = lastReply;
    }
    return topics;
  }
}

module.exports = TopicService;

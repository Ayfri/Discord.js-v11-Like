const Discord = require('discord.js');

// todo add JSDOC

Object.defineProperties(Discord.Client.prototype, {
	Broadcast       : {
		get: function () {
			return this.voice.broadcasts;
		}
	},
	Browser         : {
		value: typeof window !== 'undefined'
	},
	Channels        : {
		get: function () {
			return this.channels.cache;
		}
	},
	Emojis          : {
		get: function () {
			return this.emojis.cache;
		}
	},
	Guilds          : {
		get: function () {
			return this.guilds.cache;
		}
	},
	Ping            : {
		get: function () {
			return this.ws.ping;
		}
	},
	Status          : {
		get: function () {
			return this.ws.status;
		}
	},
	Users           : {
		get: function () {
			return this.users.cache;
		}
	},
	VoiceConnections: {
		get: function () {
			return this.voice.connections;
		}
	},
	
	FetchUser: {
		value: function (id, cache = true) {
			return this.users.fetch(id, cache);
		}
	}
});

Object.defineProperties(Discord.ClientApplication.prototype, {
	IconURL: {
		get: function () {
			return this.iconURL();
		}
	}
});

Object.defineProperties(Discord.ClientUser.prototype, {
	AvatarURL       : {
		get: function () {
			return this.avatarURL();
		}
	},
	DisplayAvatarURL: {
		get: function () {
			return this.displayAvatarURL();
		}
	},
	
	CreateGuild: {
		value: function (name, region, icon) {
			return this.client.guilds.create(name, {
				region,
				icon
			});
		}
	},
	SetGame    : {
		value: function (game, streamingURL) {
			return this.setActivity(game, {url: streamingURL});
		}
	}
});

Object.defineProperties(Discord.Collection.prototype, {
	DeleteAll: {
		value: function () {
			const result = [];
			for (let item of this.values) {
				if (item.delete) result.push(item.delete());
			}
			
			return result;
		}
	}
});

Object.defineProperties(Discord.Collector.prototype, {
	Handle   : {
		value: function (...args) {
			return this.handleCollect(...args);
		}
	},
	PostCheck: {
		value: function () {
			return this.checkEnd();
		}
	}
});

Object.defineProperties(Discord.DMChannel.prototype, {
	CreateCollector: {
		value: function (filter, options) {
			return this.createMessageCollector(filter, options);
		}
	},
	FetchMessage   : {
		value: function (messageID) {
			return this.messages.fetch(messageID);
		}
	},
	FetchMessages  : {
		value: function (options) {
			return this.messages.fetch(options);
		}
	}
});

Object.defineProperties(Discord.Emoji.prototype, {
	AddRestrictedRole    : {
		value: function (role) {
			return this.roles.add(role);
		}
	},
	AddRestrictedRoles   : {
		value: function (...roles) {
			return this.roles.set(roles);
		}
	},
	RemoveRestrictedRole : {
		value: function (role) {
			return this.roles.remove(role);
		}
	},
	RemoveRestrictedRoles: {
		value: function (...roles) {
			return this.roles.remove(roles);
		}
	}
});

Object.defineProperties(Discord.Guild.prototype, {
	BannerURL      : {
		get: function () {
			return this.bannerURL();
		}
	},
	Channels       : {
		get: function () {
			return this.channels.cache;
		}
	},
	Emojis         : {
		get: function () {
			return this.emojis.cache;
		}
	},
	IconURL        : {
		get: function () {
			return this.iconURL();
		}
	},
	Presences      : {
		get: function () {
			return this.presences.cache;
		}
	},
	Roles          : {
		get: function () {
			return this.roles.cache;
		}
	},
	SplashURL      : {
		get: function () {
			return this.splashURL();
		}
	},
	VoiceConnection: {
		get: function () {
			return this.voice.connection;
		}
	},
	
	
	CreateChannel     : {
		value: function (name, typeOrOption = 'text', permissionOverwrites, reason) {
			return this.channels.create(name, {
				type: typeOrOption,
				permissionOverwrites,
				reason
			});
		}
	},
	CreateEmoji       : {
		value: function (attachment, name, roles, reason) {
			return this.emojis.create(attachment, name, {
				roles,
				reason
			});
		}
	},
	CreateRole        : {
		value: function (roleData, reason) {
			return this.roles.create({
				roleData,
				reason
			});
		}
	},
	DeleteEmoji       : {
		value: function (emoji, reason) {
			return this.emojis.resolve(emoji).delete(reason);
		}
	},
	FetchBans         : {
		value: async function () {
			const result = new Discord.Collection();
			const bans = await this.fetchBans();
			for (const [id, ban] of bans) {
				result.set(id, ban.user);
			}
			
			return result;
		}
	},
	FetchMember       : {
		value: async function (id) {
			return await this.members.fetch(id);
		}
	},
	FetchMembers      : {
		value: async function (query, limit) {
			await this.members.fetch({
				query,
				limit
			});
			return this;
		}
	},
	PruneMembers      : {
		value: function (days, dry, reason) {
			return this.members.prune({
				days,
				dry,
				reason
			});
		}
	},
	SetChannelPosition: {
		value: function (channel, position, relative = false) {
			const resolvedChannel = this.channels.resolve(channel);
			if (relative && resolvedChannel && !['dm', 'unknown'].includes(resolvedChannel.type)) {
				position += resolvedChannel.position;
			}
			
			return this.setChannelPositions([{
				channel,
				position
			}]);
		}
	},
	SetRolePosition   : {
		value: function ({role, position}) {
			return this.roles.resolve(role).setPosition(position);
		}
	},
	Unban             : {
		value: function (user, reason) {
			return this.members.resolve(user).unban(reason);
		}
	}
});

Object.defineProperties(Discord.GuildChannel.prototype, {
	CalculatedPosition: {
		get: function () {
			return this.position;
		}
	},
	Position          : {
		get: function () {
			return this.rawPosition;
		}
	},
	
	Clone                      : {
		value: function (nameOrOptions, withPermissions, withTopic, reason) {
			let options = {
				name                : this.name,
				permissionOverwrites: withPermissions || this.permissionOverwrites,
				type                : this.type,
				topic               : withTopic || this.topic,
				nsfw                : this.nsfw,
				bitrate             : this.bitrate,
				userLimit           : this.userLimit,
				rateLimitPerUser    : this.rateLimitPerUser,
				parent              : this.parent,
				reason              : reason
			};
			if (typeof nameOrOptions === 'string') {
				options.name = nameOrOptions;
			} else {
				options = {...options, ...nameOrOptions};
			}
			
			return this.clone(options);
		}
	},
	CreateInvite               : {
		value: function (options, reason) {
			return this.createInvite({
				...options,
				reason
			});
		}
	},
	MemberPermissions          : {
		value: function (member) {
			return this.permissionsFor(member);
		}
	},
	OverwritePermissions       : {
		value: function (userOrRole, options, reason) {
			return this.createOverwrite(userOrRole, options, reason);
		}
	},
	ReplacePermissionOverwrites: {
		value: function ({overwrites, reason}) {
			return this.overwritePermissions(overwrites, reason);
		}
	},
	RolePermissions            : {
		value: function (member) {
			return this.permissionsFor(member);
		}
	},
	SetPosition                : {
		value: function (position, relative = false) {
			return this.setPosition(position, {relative});
		}
	}
});

Object.defineProperties(Discord.GuildMember.prototype, {
	ColorRole     : {
		get: function () {
			return this.roles.color;
		}
	},
	Deaf          : {
		get: function () {
			return this.voice.deaf;
		}
	},
	HighestRole   : {
		get: function () {
			return this.roles.highest;
		}
	},
	HoistRole     : {
		get: function () {
			return this.roles.hoist;
		}
	},
	Mute          : {
		get: function () {
			return this.voice.mute;
		}
	},
	Roles         : {
		get: function () {
			return this.roles.cache;
		}
	},
	SelfDeaf      : {
		get: function () {
			return this.voice.selfDeaf;
		}
	},
	SelfMute      : {
		get: function () {
			return this.voice.selfMute;
		}
	},
	ServerDeaf    : {
		get: function () {
			return this.voice.serverDeaf;
		}
	},
	ServerMute    : {
		get: function () {
			return this.voice.serverMute;
		}
	},
	Speaking      : {
		get: function () {
			return this.voice.speaking;
		}
	},
	VoiceChannel  : {
		get: function () {
			return this.voice.channel;
		}
	},
	VoiceChannelID: {
		get: function () {
			return this.voice.channelID;
		}
	},
	VoiceSessionID: {
		get: function () {
			return this.voice.sessionID;
		}
	},
	
	AddRole           : {
		value: function (role, reason) {
			return this.roles.add(role, reason);
		}
	},
	AddRoles          : {
		value: function (roles, reason) {
			return this.roles.add(roles, reason);
		}
	},
	Ban               : {
		value: function (options) {
			switch (typeof options) {
				case 'number':
					return this.ban({days: options});
				case 'string':
					return this.ban({reason: options});
				default:
					return this.ban(options);
			}
		}
	},
	HasPermission     : {
		value: function (permission, explicit = false, checkAdmin, checkOwner) {
			if (typeof checkAdmin === 'undefined') checkAdmin = !explicit;
			if (typeof checkOwner === 'undefined') checkOwner = !explicit;
			
			return explicit === this.hasPermission(permission, {
				checkAdmin,
				checkOwner
			});
		}
	},
	HasPermissions    : {
		value: function (permissions, explicit) {
			if ( !explicit && this.user.id === this.guild.ownerID) return true;
			return this.hasPermission(permissions, explicit);
		}
	},
	MissingPermissions: {
		value: function (permissions, explicit = false) {
			if ( !(permissions instanceof Array)) permissions = [permissions];
			return this.permissions.missing(permissions, explicit);
		}
	},
	RemoveRole        : {
		value: function (role, reason) {
			return this.roles.remove(role, reason);
		}
	},
	RemoveRoles       : {
		value: function (roles, reason) {
			return this.roles.remove(roles, reason);
		}
	},
	SetDeaf           : {
		value: function (deaf, reason) {
			return this.voice.setDeaf(deaf, reason);
		}
	},
	SetMute           : {
		value: function (deaf, reason) {
			return this.voice.setMute(deaf, reason);
		}
	},
	SetVoiceChannel   : {
		value: function (deaf, reason) {
			return deaf === null ? this.voice.kick(reason) : this.voice.setChannel(deaf, reason);
		}
	},
	SetRoles          : {
		value: function (roles, reason) {
			return this.roles.set(roles, reason);
		}
	}
});

Object.defineProperties(Discord.Invite.prototype, {
	TextChannelCount : {
		get: function () {
			return this.guild.channels.filter(channel => channel.type === 'text');
		}
	},
	VoiceChannelCount: {
		get: function () {
			return this.guild.channels.filter(channel => channel.type === 'voice');
		}
	}
});

Object.defineProperties(Discord.Message.prototype, {
	Reactions: {
		get: function () {
			return this.roles.cache;
		}
	},
	
	ClearReactions   : {
		value: function () {
			return this.reactions.removeAll();
		}
	},
	Delete           : {
		value: function (timeout, reason) {
			return this.delete({
				timeout,
				reason
			});
		}
	},
	IsMemberMentioned: {
		value: function (member) {
			return this.mentions.has(member);
		}
	},
	IsMentioned      : {
		value: function (data) {
			return this.mentions.has(data);
		}
	}
});

Object.defineProperties(Discord.MessageAttachment.prototype, {
	FileName: {
		get: function () {
			return this.name;
		}
	},
	FileSize: {
		get: function () {
			return this.size;
		}
	}
});

Object.defineProperties(Discord.MessageCollector.prototype, {
	message: {
		value: function (...args) {
			return this.on(...args);
		}
	}
});

Object.defineProperties(Discord.MessageEmbed.prototype, {
	AddBlankField: {
		value: function () {
			return this.addField('\u200b', '\u200b');
		}
	},
	AttachFile   : {
		value: function (file) {
			return this.attachFiles([file]);
		}
	}
});

Object.defineProperties(Discord.MessageReaction.prototype, {
	FetchUsers: {
		value: function (limit = 100, {before, after}) {
			return this.users.fetch({
				limit,
				before,
				after
			});
		}
	},
	Remove    : {
		value: function (user) {
			return this.users.remove(user);
		}
	}
});

Object.defineProperties(Discord.Permissions.prototype, {
	Raw: {
		get: function () {
			return this.bitfield;
		}
	},
	
	HasPermission     : {
		value: function (permission, explicit = false) {
			return this.has(permission, !explicit);
		}
	},
	HasPermissions    : {
		value: function (permissions, explicit = false) {
			return this.has(permissions, !explicit);
		}
	},
	MissingPermissions: {
		value: function (permissions, explicit = false) {
			return this.missing(permissions, !explicit);
		}
	}
});

Object.defineProperties(Discord.Presence.prototype, {
	Game: {
		get: function () {
			return this.activities[0];
		}
	}
});

Object.defineProperties(Discord.RichPresenceAssets.prototype, {
	SmallImageURL: {
		get: function () {
			return this.smallImageURL();
		}
	},
	LargeImageURL: {
		get: function () {
			return this.largeImageURL();
		}
	}
});

Object.defineProperties(Discord.Role.prototype, {
	CalculatedPosition: {
		get: function () {
			return this.position;
		}
	},
	Position          : {
		get: function () {
			return this.rawPosition;
		}
	},
	
	HasPermission : {
		value: function (permission, explicit = false, checkAdmin) {
			return new Discord.Permissions(this.permissions).has(permission, typeof checkAdmin === 'undefined' ? !explicit : checkAdmin);
		}
	},
	HasPermissions: {
		value: function (permissions, explicit = false) {
			if ( !explicit && this.user.id === this.guild.ownerID) return true;
			return this.permissions.has(permissions, explicit);
		}
	},
	Serialize     : {
		value: function () {
			return this.permissions.serialize();
		}
	},
	SetPosition   : {
		value: function (position, relative = false, reason) {
			return this.setPosition(position, {
				relative,
				reason
			});
		}
	}
});

Object.defineProperties(Discord.Shard.prototype, {
	Spawn: {
		value: function (args, execArgv) {
			if (typeof args !== 'undefined') this.args = args;
			if (typeof execArgv !== 'undefined') this.execArgv = execArgv;
			
			return this.spawn();
		}
	}
});

Object.defineProperties(Discord.ShardClientUtil.prototype, {

});

Object.defineProperties(Discord.ShardingManager.prototype, {
	RespawnAll: {
		value: function (shardDelay = 5000, respawnDelay = 500, waitForReady = true, currentShardIndex = 0) {
			let s = 0;
			const shard = this.shards.get(currentShardIndex);
			const promises = [shard.respawn(respawnDelay, waitForReady)];
			if (++s < this.shards.size && shardDelay > 0) promises.push(Discord.Util.delayFor(shardDelay));
			return Promise.all(promises).then(() => {
				return ++currentShardIndex === this.shards.size ? this.shards : this.respawnAll(shardDelay, respawnDelay, waitForReady, currentShardIndex);
			});
		}
	}
});

// This class is private, we will workaround to make the code working.
/*Object.defineProperties(Discord.StreamDispatcher.prototype, {
	Stream: {
		get: function () {
			return this.broadcast;
		}
	},
	Time  : {
		get: function () {
			return this.streamTime;
		}
	}
});*/

Object.defineProperties(Discord.TextChannel.prototype, {
	CreateCollector    : {
		value: function (filter, {maxMatches, max, time}) {
			return this.createMessageCollector(filter, {
				max         : maxMatches,
				maxProcessed: max,
				time
			});
		}
	},
	CreateWebhook      : {
		value: function (name, avatar, reason) {
			return this.createWebhook(name, {
				avatar,
				reason
			});
		}
	},
	FetchMessage       : {
		value: function (messageID) {
			return this.messages.fetch(messageID);
		}
	},
	FetchMessages      : {
		value: function ({limit, before, after, around}) {
			return this.messages.fetch({
				limit,
				before,
				after,
				around
			});
		}
	},
	FetchPinnedMessages: {
		value: function () {
			return this.messages.fetchPinned();
		}
	}
});

Object.defineProperties(Discord.User.prototype, {
	AvatarURL       : {
		get: function () {
			return this.avatarURL();
		}
	},
	DisplayAvatarURL: {
		get: function () {
			return this.displayAvatarURL();
		}
	}
});

Object.defineProperties(Discord.VoiceBroadcast.prototype, {
	Dispatchers: {
		get: function () {
			return this.subscribers;
		}
	},
	Destroy    : {
		value: function () {
			return this.end();
		}
	},
	
	PlayArbitraryInput: {
		value: function (input, options) {
			return this.play(input, options);
		}
	},
	PlayConvertedInput: {
		value: function (stream, options) {
			return this.play(stream, options);
		}
	},
	PlayFile          : {
		value: function (file, options) {
			return this.play(file, options);
		}
	},
	PlayOpusStream    : {
		value: function (stream, options) {
			return this.play(stream, options);
		}
	},
	PlayStream        : {
		value: function (stream, options) {
			return this.play(stream, options);
		}
	},
	Resume            : {
		value: function () {
			this.dispatcher.resume();
		}
	}
});

Object.defineProperties(Discord.VoiceConnection.prototype, {
	CreateReceiver    : {
		value: function () {
			return this.receiver;
		}
	},
	PlayArbitraryInput: {
		value: function (input, options) {
			return this.play(input, options);
		}
	},
	PlayConvertedInput: {
		value: function (stream, options) {
			return this.play(stream, options);
		}
	},
	PlayFile          : {
		value: function (file, options) {
			return this.play(file, options);
		}
	},
	PlayOpusStream    : {
		value: function (stream, options) {
			return this.play(stream, options);
		}
	},
	PlayStream        : {
		value: function (stream, options) {
			return this.play(stream, options);
		}
	}
});

Object.defineProperties(Discord.VoiceReceiver.prototype, {
	CreateOpusStream: {
		value: function (user) {
			return this.createStream(user);
		}
	},
	CreatePCMStream : {
		value: function (user) {
			return this.createStream(user);
		}
	}
});

Object.defineProperties(Discord.Webhook.prototype, {
	AvatarURL       : {
		get: function () {
			return this.avatarURL();
		}
	},
});


module.exports = Discord;
const Discord = require('discord.js');

// todo add JSDOC

Object.defineProperties(Discord.Client.prototype, {
	Broadcast: {
		get() {
			return this.voice.broadcasts;
		},
	},
	Browser: {
		value: typeof window !== 'undefined',
	},
	Channels: {
		get() {
			return this.channels.cache;
		},
	},
	Emojis: {
		get() {
			return this.emojis.cache;
		},
	},
	Guilds: {
		get() {
			return this.guilds.cache;
		},
	},
	Ping: {
		get() {
			return this.ws.ping;
		},
	},
	Status: {
		get() {
			return this.ws.status;
		},
	},
	Users: {
		get() {
			return this.users.cache;
		},
	},
	VoiceConnections: {
		get() {
			return this.voice.connections;
		},
	},

	FetchUser: {
		value(id, cache = true) {
			return this.users.fetch(id, cache);
		},
	},
});

Object.defineProperties(Discord.ClientApplication.prototype, {
	IconURL: {
		get() {
			return this.iconURL();
		},
	},
});

Object.defineProperties(Discord.ClientUser.prototype, {
	AvatarURL: {
		get() {
			return this.avatarURL();
		},
	},
	DisplayAvatarURL: {
		get() {
			return this.displayAvatarURL();
		},
	},

	CreateGuild: {
		value(name, region, icon) {
			return this.client.guilds.create(name, {
				region,
				icon,
			});
		},
	},
	SetGame: {
		value(game, streamingURL) {
			return this.setActivity(game, { url: streamingURL });
		},
	},
});

Object.defineProperties(Discord.Collection.prototype, {
	DeleteAll: {
		value() {
			const result = [];
			for (let item of this.values) {
				if (item.delete) result.push(item.delete());
			}
			
			return result;
		},
	},
});

Object.defineProperties(Discord.Collector.prototype, {
	Handle: {
		value(...args) {
			return this.handleCollect(...args);
		},
	},
	PostCheck: {
		value() {
			return this.checkEnd();
		},
	},
});

Object.defineProperties(Discord.DMChannel.prototype, {
	CreateCollector: {
		value(filter, options) {
			return this.createMessageCollector(filter, options);
		},
	},
	FetchMessage: {
		value(messageID) {
			return this.messages.fetch(messageID);
		},
	},
	FetchMessages: {
		value(options) {
			return this.messages.fetch(options);
		},
	},
});

Object.defineProperties(Discord.Emoji.prototype, {
	AddRestrictedRole: {
		value(role) {
			return this.roles.add(role);
		},
	},
	AddRestrictedRoles: {
		value(...roles) {
			return this.roles.set(roles);
		},
	},
	RemoveRestrictedRole: {
		value(role) {
			return this.roles.remove(role);
		},
	},
	RemoveRestrictedRoles: {
		value(...roles) {
			return this.roles.remove(roles);
		},
	},
});

Object.defineProperties(Discord.Guild.prototype, {
	BannerURL: {
		get() {
			return this.bannerURL();
		},
	},
	Channels: {
		get() {
			return this.channels.cache;
		},
	},
	Emojis: {
		get() {
			return this.emojis.cache;
		},
	},
	IconURL: {
		get() {
			return this.iconURL();
		},
	},
	Presences: {
		get() {
			return this.presences.cache;
		},
	},
	Roles: {
		get() {
			return this.roles.cache;
		},
	},
	SplashURL: {
		get() {
			return this.splashURL();
		},
	},
	VoiceConnection: {
		get() {
			return this.voice.connection;
		},
	},

	CreateChannel: {
		value(name, typeOrOption = 'text', permissionOverwrites, reason) {
			return this.channels.create(name, {
				type: typeOrOption,
				permissionOverwrites,
				reason,
			});
		},
	},
	CreateEmoji: {
		value(attachment, name, roles, reason) {
			return this.emojis.create(attachment, name, {
				roles,
				reason,
			});
		},
	},
	CreateRole: {
		value(roleData, reason) {
			return this.roles.create({
				roleData,
				reason,
			});
		},
	},
	DeleteEmoji: {
		value(emoji, reason) {
			return this.emojis.resolve(emoji).delete(reason);
		},
	},
	FetchBans: {
		async value() {
			const result = new Discord.Collection();
			const bans = await this.fetchBans();
			for (const [id, ban] of bans) {
				result.set(id, ban.user);
			}
			
			return result;
		},
	},
	FetchMember: {
		async value(id) {
			return await this.members.fetch(id);
		},
	},
	FetchMembers: {
		async value(query, limit) {
			await this.members.fetch({
				query,
				limit,
			});
			return this;
		},
	},
	PruneMembers: {
		value(days, dry, reason) {
			return this.members.prune({
				days,
				dry,
				reason,
			});
		},
	},
	SetChannelPosition: {
		value(channel, position, relative = false) {
			const resolvedChannel = this.channels.resolve(channel);
			if (relative && resolvedChannel && !['dm', 'unknown'].includes(resolvedChannel.type)) {
				position += resolvedChannel.position;
			}
			
			return this.setChannelPositions([
				{
					channel,
					position,
				},
			]);
		},
	},
	SetRolePosition: {
		value({
			      role,
			      position,
		      }) {
			return this.roles.resolve(role).setPosition(position);
		},
	},
	Unban: {
		value(user, reason) {
			return this.members.resolve(user).unban(reason);
		},
	},
});

Object.defineProperties(Discord.GuildChannel.prototype, {
	CalculatedPosition: {
		get() {
			return this.position;
		},
	},
	Position: {
		get() {
			return this.rawPosition;
		},
	},

	Clone: {
		value(nameOrOptions, withPermissions, withTopic, reason) {
			let options = {
				name:                 this.name,
				permissionOverwrites: withPermissions || this.permissionOverwrites,
				type:                 this.type,
				topic:                withTopic || this.topic,
				nsfw:                 this.nsfw,
				bitrate:              this.bitrate,
				userLimit:            this.userLimit,
				rateLimitPerUser:     this.rateLimitPerUser,
				parent:               this.parent,
				reason:               reason,
			};
			if (typeof nameOrOptions === 'string') {
				options.name = nameOrOptions;
			} else {
				options = { ...options, ...nameOrOptions };
			}
			
			return this.clone(options);
		},
	},
	CreateInvite: {
		value(options, reason) {
			return this.createInvite({
				...options,
				reason,
			});
		},
	},
	MemberPermissions: {
		value(member) {
			return this.permissionsFor(member);
		},
	},
	OverwritePermissions: {
		value(userOrRole, options, reason) {
			return this.createOverwrite(userOrRole, options, reason);
		},
	},
	ReplacePermissionOverwrites: {
		value({
			      overwrites,
			      reason,
		      }) {
			return this.overwritePermissions(overwrites, reason);
		},
	},
	RolePermissions: {
		value(member) {
			return this.permissionsFor(member);
		},
	},
	SetPosition: {
		value(position, relative = false) {
			return this.setPosition(position, { relative });
		},
	},
});

Object.defineProperties(Discord.GuildMember.prototype, {
	ColorRole: {
		get() {
			return this.roles.color;
		},
	},
	Deaf: {
		get() {
			return this.voice.deaf;
		},
	},
	HighestRole: {
		get() {
			return this.roles.highest;
		},
	},
	HoistRole: {
		get() {
			return this.roles.hoist;
		},
	},
	Mute: {
		get() {
			return this.voice.mute;
		},
	},
	Roles: {
		get() {
			return this.roles.cache;
		},
	},
	SelfDeaf: {
		get() {
			return this.voice.selfDeaf;
		},
	},
	SelfMute: {
		get() {
			return this.voice.selfMute;
		},
	},
	ServerDeaf: {
		get() {
			return this.voice.serverDeaf;
		},
	},
	ServerMute: {
		get() {
			return this.voice.serverMute;
		},
	},
	Speaking: {
		get() {
			return this.voice.speaking;
		},
	},
	VoiceChannel: {
		get() {
			return this.voice.channel;
		},
	},
	VoiceChannelID: {
		get() {
			return this.voice.channelID;
		},
	},
	VoiceSessionID: {
		get() {
			return this.voice.sessionID;
		},
	},

	AddRole: {
		value(role, reason) {
			return this.roles.add(role, reason);
		},
	},
	AddRoles: {
		value(roles, reason) {
			return this.roles.add(roles, reason);
		},
	},
	Ban: {
		value(options) {
			switch (typeof options) {
				case 'number':
					return this.ban({ days: options });
				case 'string':
					return this.ban({ reason: options });
				default:
					return this.ban(options);
			}
		},
	},
	HasPermission: {
		value(permission, explicit = false, checkAdmin, checkOwner) {
			if (typeof checkAdmin === 'undefined') checkAdmin = !explicit;
			if (typeof checkOwner === 'undefined') checkOwner = !explicit;
			
			return (explicit === this.hasPermission(permission, {
					checkAdmin,
					checkOwner,
				}));
		},
	},
	HasPermissions: {
		value(permissions, explicit) {
			if (!explicit && this.user.id === this.guild.ownerID) return true;
			return this.hasPermission(permissions, explicit);
		},
	},
	MissingPermissions: {
		value(permissions, explicit = false) {
			if (!(permissions instanceof Array)) permissions = [permissions];
			return this.permissions.missing(permissions, explicit);
		},
	},
	RemoveRole: {
		value(role, reason) {
			return this.roles.remove(role, reason);
		},
	},
	RemoveRoles: {
		value(roles, reason) {
			return this.roles.remove(roles, reason);
		},
	},
	SetDeaf: {
		value(deaf, reason) {
			return this.voice.setDeaf(deaf, reason);
		},
	},
	SetMute: {
		value(deaf, reason) {
			return this.voice.setMute(deaf, reason);
		},
	},
	SetVoiceChannel: {
		value(deaf, reason) {
			return deaf === null ? this.voice.kick(reason) : this.voice.setChannel(deaf, reason);
		},
	},
	SetRoles: {
		value(roles, reason) {
			return this.roles.set(roles, reason);
		},
	},
});

Object.defineProperties(Discord.Invite.prototype, {
	TextChannelCount: {
		get() {
			return this.guild.channels.filter(channel => channel.type === 'text');
		},
	},
	VoiceChannelCount: {
		get() {
			return this.guild.channels.filter(channel => channel.type === 'voice');
		},
	},
});

Object.defineProperties(Discord.Message.prototype, {
	Reactions: {
		get() {
			return this.roles.cache;
		},
	},

	ClearReactions: {
		value() {
			return this.reactions.removeAll();
		},
	},
	Delete: {
		value(timeout, reason) {
			return this.delete({
				timeout,
				reason,
			});
		},
	},
	IsMemberMentioned: {
		value(member) {
			return this.mentions.has(member);
		},
	},
	IsMentioned: {
		value(data) {
			return this.mentions.has(data);
		},
	},
});

Object.defineProperties(Discord.MessageAttachment.prototype, {
	FileName: {
		get() {
			return this.name;
		},
	},
	FileSize: {
		get() {
			return this.size;
		},
	},
});

Object.defineProperties(Discord.MessageCollector.prototype, {
	message: {
		value(...args) {
			return this.on(...args);
		},
	},
});

Object.defineProperties(Discord.MessageEmbed.prototype, {
	AddBlankField: {
		value() {
			return this.addField('\u200b', '\u200b');
		},
	},
	AttachFile: {
		value(file) {
			return this.attachFiles([file]);
		},
	},
});

Object.defineProperties(Discord.MessageReaction.prototype, {
	FetchUsers: {
		value(limit = 100, {
			before,
			after,
		}) {
			return this.users.fetch({
				limit,
				before,
				after,
			});
		},
	},
	Remove: {
		value(user) {
			return this.users.remove(user);
		},
	},
});

Object.defineProperties(Discord.Permissions.prototype, {
	Raw: {
		get() {
			return this.bitfield;
		},
	},

	HasPermission: {
		value(permission, explicit = false) {
			return this.has(permission, !explicit);
		},
	},
	HasPermissions: {
		value(permissions, explicit = false) {
			return this.has(permissions, !explicit);
		},
	},
	MissingPermissions: {
		value(permissions, explicit = false) {
			return this.missing(permissions, !explicit);
		},
	},
});

Object.defineProperties(Discord.Presence.prototype, {
	Game: {
		get() {
			return this.activities[0];
		},
	},
});

Object.defineProperties(Discord.RichPresenceAssets.prototype, {
	SmallImageURL: {
		get() {
			return this.smallImageURL();
		},
	},
	LargeImageURL: {
		get() {
			return this.largeImageURL();
		},
	},
});

Object.defineProperties(Discord.Role.prototype, {
	CalculatedPosition: {
		get() {
			return this.position;
		},
	},
	Position: {
		get() {
			return this.rawPosition;
		},
	},

	HasPermission: {
		value(permission, explicit = false, checkAdmin) {
			return new Discord.Permissions(this.permissions).has(permission, typeof checkAdmin === 'undefined' ? !explicit : checkAdmin);
		},
	},
	HasPermissions: {
		value(permissions, explicit = false) {
			if (!explicit && this.user.id === this.guild.ownerID) return true;
			return this.permissions.has(permissions, explicit);
		},
	},
	Serialize: {
		value() {
			return this.permissions.serialize();
		},
	},
	SetPosition: {
		value(position, relative = false, reason) {
			return this.setPosition(position, {
				relative,
				reason,
			});
		},
	},
});

Object.defineProperties(Discord.Shard.prototype, {
	Spawn: {
		value(args, execArgv) {
			if (typeof args !== 'undefined') this.args = args;
			if (typeof execArgv !== 'undefined') this.execArgv = execArgv;
			
			return this.spawn();
		},
	},
});

Object.defineProperties(Discord.ShardClientUtil.prototype, {});

Object.defineProperties(Discord.ShardingManager.prototype, {
	RespawnAll: {
		value(shardDelay = 5000, respawnDelay = 500, waitForReady = true, currentShardIndex = 0) {
			let s = 0;
			const shard = this.shards.get(currentShardIndex);
			const promises = [shard.respawn(respawnDelay, waitForReady)];
			if (++s < this.shards.size && shardDelay > 0) promises.push(Discord.Util.delayFor(shardDelay));
			return Promise.all(promises).then(() => {
				return ++currentShardIndex === this.shards.size ? this.shards : this.respawnAll(shardDelay, respawnDelay, waitForReady, currentShardIndex);
			});
		},
	},
});

Object.defineProperties(Discord.StreamDispatcher.prototype, {
	Stream: {
		get() {
			return this.broadcast;
		},
	},
	Time: {
		get() {
			return this.streamTime;
		},
	},
});

Object.defineProperties(Discord.TextChannel.prototype, {
	CreateCollector: {
		value(filter, {
			maxMatches,
			max,
			time,
		}) {
			return this.createMessageCollector(filter, {
				max: maxMatches,
				maxProcessed: max,
				time,
			});
		},
	},
	CreateWebhook: {
		value(name, avatar, reason) {
			return this.createWebhook(name, {
				avatar,
				reason,
			});
		},
	},
	FetchMessage: {
		value(messageID) {
			return this.messages.fetch(messageID);
		},
	},
	FetchMessages: {
		value({
			      limit,
			      before,
			      after,
			      around,
		      }) {
			return this.messages.fetch({
				limit,
				before,
				after,
				around,
			});
		},
	},
	FetchPinnedMessages: {
		value() {
			return this.messages.fetchPinned();
		},
	},
});

Object.defineProperties(Discord.User.prototype, {
	AvatarURL: {
		get() {
			return this.avatarURL();
		},
	},
	DisplayAvatarURL: {
		get() {
			return this.displayAvatarURL();
		},
	},
});

Object.defineProperties(Discord.VoiceBroadcast.prototype, {
	Dispatchers: {
		get() {
			return this.subscribers;
		},
	},
	Destroy: {
		value() {
			return this.end();
		},
	},

	PlayArbitraryInput: {
		value(input, options) {
			return this.play(input, options);
		},
	},
	PlayConvertedInput: {
		value(stream, options) {
			return this.play(stream, options);
		},
	},
	PlayFile: {
		value(file, options) {
			return this.play(file, options);
		},
	},
	PlayOpusStream: {
		value(stream, options) {
			return this.play(stream, options);
		},
	},
	PlayStream: {
		value(stream, options) {
			return this.play(stream, options);
		},
	},
	Resume: {
		value() {
			this.dispatcher.resume();
		},
	},
});

Object.defineProperties(Discord.VoiceConnection.prototype, {
	CreateReceiver: {
		value() {
			return this.receiver;
		},
	},
	PlayArbitraryInput: {
		value(input, options) {
			return this.play(input, options);
		},
	},
	PlayConvertedInput: {
		value(stream, options) {
			return this.play(stream, options);
		},
	},
	PlayFile: {
		value(file, options) {
			return this.play(file, options);
		},
	},
	PlayOpusStream: {
		value(stream, options) {
			return this.play(stream, options);
		},
	},
	PlayStream: {
		value(stream, options) {
			return this.play(stream, options);
		},
	},
});

Object.defineProperties(Discord.VoiceReceiver.prototype, {
	CreateOpusStream: {
		value(user) {
			return this.createStream(user);
		},
	},
	CreatePCMStream: {
		value(user) {
			return this.createStream(user);
		},
	},
});

Object.defineProperties(Discord.Webhook.prototype, {
	AvatarURL: {
		get() {
			return this.avatarURL();
		},
	},
});

module.exports = Discord;

---
title: Workspaces
---

<TitleSpan>How to Guides</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Workspaces provides you with a way to invite other users to help, or collaborate
with, on integrations and deployments. This makes it easy to manage your
Airnodes as a team, or to outsource the process while still maintaining control
over your integrations and deployments.

## Creating a Workspace

Your workspace is created automatically and you will by default be the “owner”,
which is also tied to your ChainAPI account.

## Navigating to Workspace Settings

You can navigate to your workspace through your account settings or by clicking
on your workspace name on the left-hand navigation panel. If you are part of
more than one workspace, you can also use the left-hand vertical navigation to
switch between workspaces.

## Managing your Workspace

### Editing Workspace Settings

In your workspace settings page you can rename your workspace and its
description.

### Inviting members to your Workspace

You can invite others to your workspace by clicking “Manage” on your Workspace
and visiting the “Members” section.

Only users who have active ChainAPI accounts with confirmed email addresses may
be invited.

Each member will need to be assigned a role that can be changed by a Workspace
Owner or Administrator. You can also assign a Name, which will be visible only
to you.

### Leaving or Deactivating a Workspace

To “leave” a workspace, navigate to your account settings, you will then be able
to leave any workspace you are not the owner of by clicking the “Leave” button
for that workspace.

Owners cannot leave their own workspace. Only workspace owners can deactivate a
workspace. Since the workspace is attached to the owner’s account, the owner
must also deactivate their ChainAPI account to deactivate a workspace.

## Workspace Roles

The following workspace roles can be assigned to users and changed by using the
drop down or by clicking the ellipsis.

### Viewer

Viewers are able to view your workspace’s integrations and deployments. They are
not able to make any changes to the integrations or deployments.

### Member

Members have all viewer permissions and can also create and edit your
workspace’s integrations and deployments.

### Admin

Admins have all member permissions and can also invite and remove users from the
workspace, and edit workspace settings. Admins can not delete a workspace.

### Owner

As a Workspace owner, your workspace is linked to your ChainAPI account. If you
deactivate your ChainAPI account the workspace will also be deactivated and your
workspace users will be removed. You cannot transfer workspace ownership at this
time.

## Workspace Notifications

You are able to control which workspaces you receive notifications for by going
to your account settings and toggling on/off the notifications per workspace
under the notifications section.

## Selecting your Workspace

If you belong to two or more workspaces, you can change between the workspace
you want to work on by clicking on the workspace name on the left panel and
selecting the workspace from there.

## Integrations and Deployments within Workspaces

Any integrations or deployments that are setup are stored at a workspace level.
This means that if a user creates an integration or a deployment and then
leaves, the integration or deployment will remain.

## DNS Verification

You can verify that your Workspace is the owner of the domains used in your
Integrations by adding a TXT record at your domain registrar.

ChainAPI will periodically check the DNS records for each of your domains. If a
TXT record is found with its content matching the verification snippet, it will
mark that domain and any Integrations it is used in as verified.

### Verification

1. Copy the verification snippet to your clipboard.
2. Add a TXT record at your provider. Below are links to instructions for
   popular providers:

- [Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#TXTFormat)
- [BlueHost](https://www.bluehost.com/help/article/txt-records)
- [Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
- [Enom](https://cp.enom.com/kb/kb/kb_0488-add-spf-txt-records.htm)
- [GoDaddy](https://za.godaddy.com/help/add-a-txt-record-19232)
- [Google Domains](https://support.google.com/a/answer/183895?hl=en)
- [Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain/)

3. Wait for the the DNS record changes to propagate. This can take up to 72
   hours.
4. ChainAPI will notify all owners and admins on the Workspace when the domain
   is verified.

### Removing Verification

1. Remove the TXT record at your provider.
2. Wait for the the DNS record changes to propagate. This can take up to 72
   hours.
3. ChainAPI will notify all owners and admins on the Workspace when the domain
   has been unverified.

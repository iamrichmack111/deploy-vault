# Installation and Desktop Launchers

![DeployVault desktop icon](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/assets/deployvault-icon.png)

DeployVault can run directly from its folder or install as a user-level desktop application. The installer detects the operating system and does not require administrator access for the application files.

## macOS

```bash
cd ~/Downloads/deploy-vault-lite
chmod +x install.sh
./install.sh
```

The installer creates `~/Applications/DeployVault.app` using the included `.icns` icon. Launch it from Finder, Spotlight, or:

```bash
open ~/Applications/DeployVault.app
```

If Gatekeeper blocks a locally created launcher, right-click the application, select **Open**, and confirm. This does not bypass a downloaded third-party binary; the launcher is generated from the local project.

## Linux

```bash
chmod +x install.sh
./install.sh
```

The installer places a command in `~/.local/bin/deployvault` and creates an application-menu entry. Ensure `~/.local/bin` is included in `PATH` when launching from a terminal.

```bash
deployvault
```

## Windows PowerShell

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install.ps1
```

The policy change applies only to the current PowerShell process. The launcher uses the included `.ico` asset.

## Portable startup

Installation is optional. The portable command remains:

```bash
./start.sh
```

This is preferable for temporary systems, training rooms, and repository development.

## Port and network options

```bash
./start.sh --port 8081
./start.sh --host 0.0.0.0 --port 8080 --no-browser
```

Do not expose the unauthenticated local trainer directly to the public internet. If remote access is required, place it behind an authenticated reverse proxy and normal network controls.

## Uninstall

Delete the user-level launcher created for the operating system. Browser progress remains in the browser profile until site data for the DeployVault origin is cleared.

The application directory can be retained as a portable copy or removed after exported runbooks and custom scenario data have been preserved.


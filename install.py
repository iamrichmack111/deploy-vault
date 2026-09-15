#!/usr/bin/env python3
"""Cross-platform user-level desktop installer for DeployVault."""
from pathlib import Path
import os, platform, shutil, stat, subprocess, sys

ROOT=Path(__file__).resolve().parent
SYSTEM=platform.system()

def copy_app(dest):
    if dest.exists(): shutil.rmtree(dest)
    dest.mkdir(parents=True)
    for name in ("app.py","data","static","assets"):
        src=ROOT/name
        shutil.copytree(src,dest/name) if src.is_dir() else shutil.copy2(src,dest/name)

def linux():
    dest=Path.home()/'.local/share/deployvault'; copy_app(dest)
    launcher=Path.home()/'.local/bin/deployvault'; launcher.parent.mkdir(parents=True,exist_ok=True)
    launcher.write_text(f'#!/bin/sh\nexec python3 "{dest}/app.py" "$@"\n'); launcher.chmod(0o755)
    desktop=Path.home()/'.local/share/applications/deployvault.desktop'; desktop.parent.mkdir(parents=True,exist_ok=True)
    desktop.write_text(f'[Desktop Entry]\nName=DeployVault\nComment=Kubernetes Incident Trainer\nExec={launcher}\nIcon={dest}/assets/deployvault-icon.png\nTerminal=false\nType=Application\nCategories=Development;Education;\n')
    print(f'Installed DeployVault for Linux. Launcher: {launcher}')

def macos():
    bundle=Path.home()/'Applications/DeployVault.app'; resources=bundle/'Contents/Resources'; macos=bundle/'Contents/MacOS'
    copy_app(resources/'app'); macos.mkdir(parents=True,exist_ok=True)
    exe=macos/'DeployVault'; exe.write_text(f'#!/bin/sh\nexport PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"\nexec /usr/bin/env python3 "{resources}/app/app.py"\n'); exe.chmod(0o755)
    (bundle/'Contents/Info.plist').write_text('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>CFBundleName</key><string>DeployVault</string><key>CFBundleIdentifier</key><string>com.richmack.deployvault</string><key>CFBundleVersion</key><string>1.0.0</string><key>CFBundleExecutable</key><string>DeployVault</string><key>CFBundleIconFile</key><string>deployvault-icon</string></dict></plist>')
    icon=ROOT/'assets/deployvault-icon.icns'
    if icon.exists(): shutil.copy2(icon,resources/icon.name)
    print(f'Installed DeployVault for macOS: {bundle}')

def windows():
    local=Path(os.environ.get('LOCALAPPDATA',Path.home()/'AppData/Local')); dest=local/'DeployVault'; copy_app(dest)
    cmd=dest/'DeployVault.cmd'; cmd.write_text(f'@echo off\r\nstart "DeployVault" pythonw "{dest / "app.py"}"\r\n')
    desktop=Path.home()/'Desktop'/'DeployVault.lnk'
    ps=f'''$s=(New-Object -ComObject WScript.Shell).CreateShortcut('{desktop}');$s.TargetPath='{cmd}';$s.WorkingDirectory='{dest}';$s.IconLocation='{dest / "assets/deployvault-icon.ico"}';$s.Description='Kubernetes Incident Trainer';$s.Save()'''
    subprocess.run(['powershell','-NoProfile','-Command',ps],check=True)
    print(f'Installed DeployVault for Windows. Shortcut: {desktop}')

if SYSTEM=='Darwin': macos()
elif SYSTEM=='Linux': linux()
elif SYSTEM=='Windows': windows()
else: raise SystemExit(f'Unsupported operating system: {SYSTEM}')

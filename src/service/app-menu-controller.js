import electron from 'electron';
const { remote } = electron;

import store from '../store';
import AppMenu from '@/service/app-menu';

import { EventBus } from '@/lib/event-bus';

const AppMenuController = {
  toggleAlwaysOnTop() {
    const currentWindow = remote.getCurrentWindow();
    const isAlwaysOnTop = currentWindow.isAlwaysOnTop();
    currentWindow.setAlwaysOnTop(!isAlwaysOnTop);
    store.dispatch('updateAlwaysOnTop', !isAlwaysOnTop);
  },
  undo() {
    EventBus.$emit('undo');
  },
  redo() {
    EventBus.$emit('redo');
  },
  newFile() {
    EventBus.$emit('newFile');
  },
  openFile() {
    EventBus.$emit('openFile');
  },
  saveFile() {
    EventBus.$emit('saveFile');
  },
  saveAs() {
    EventBus.$emit('saveAs');
  },
  togglePreview() {
    AppMenu.checkedMenuItem('toggle_preview_panel', !this.isOpenPreview());
    store.dispatch('updateIsPreview', !this.isOpenPreview());
  },
  codelabPreview() {
    const win = new remote.BrowserWindow({ width: 960, hehight: 540 });
    win.loadURL(`file:///home/daniel/git/conacyt-codelabs/output/api-guidelines/index.html#0`);
  },
  toggleToolbar() {
    AppMenu.checkedMenuItem('toggle_toolbar', !this.isOpenToolbar());
    store.dispatch('toggleToolbar');
  },
  isOpenPreview() {
    return store.state.Editor.isPreview;
  },
  isOpenToolbar() {
    return store.state.Editor.openToolbar;
  },
};

export default AppMenuController;

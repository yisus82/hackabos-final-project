import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngxs/store';
import { ChangeAvatarSuccess } from '../../store/auth/auth.actions';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() imageUrl: string;
  selectedFile: ImageSnippet;

  constructor(private authService: AuthService, private store: Store) {}

  onSuccess(response: any) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.imageUrl = response.headers.get('Location');
    console.log(response.headers);

    this.store.dispatch(new ChangeAvatarSuccess(this.imageUrl));
  }

  onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.authService
        .changeAvatar(this.selectedFile.file)
        .subscribe(response => this.onSuccess(response), () => this.onError());
    });

    reader.readAsDataURL(file);
  }
}

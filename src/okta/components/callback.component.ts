/*
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { toRelativeUrl } from '@okta/okta-auth-js';

import { OktaAuthService } from '../services/okta.service';

@Component({
  template: `<div>{{error}}</div>`
})
export class OktaCallbackComponent implements OnInit {
  error: string;

  constructor(private okta: OktaAuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      // Store tokens when redirect back from OKTA
      await this.okta.storeTokensFromRedirect();

      // Get and clear fromUri from storage
      const fromUri =  this.okta.getFromUri();
      this.okta.removeFromUri();

      // Redirect to fromUri
      const onPostLoginRedirect = this.okta.getOktaConfig().onPostLoginRedirect;
      if (onPostLoginRedirect) {
        onPostLoginRedirect(fromUri, this.router);
      } else {
        this.router.navigate([ 
          toRelativeUrl(fromUri, window.location.origin) 
        ], { replaceUrl: true });
      }
    } catch (e) {
      this.error = e.toString();
    }
  }
}

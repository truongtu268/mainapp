import getAsyncInjectors from './utils/asyncInjectors'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err)
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes(store) {
  const { injectSagas } = getAsyncInjectors(store)

  return [
    {
      path: '/login',
      name: 'LoginContainer',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb)
        Promise.all([
          System.import('containers/LoginContainer/sagas'),
          System.import('containers/LoginContainer'),
        ])
        .then(([sagas, component]) => {
          injectSagas('loginContainer', sagas.default)
          renderRoute(component)
        })
        .catch(errorLoading)
      },
    },
    {
      path: '/forgotpassword',
      name: 'forgotPasswordContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ForgotPasswordContainer/sagas'),
          System.import('containers/ForgotPasswordContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas('forgotPasswordContainer', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/',
      name: 'homePageContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Home/sagas'),
          System.import('containers/Bot/sagas'),
          System.import('containers/Home'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([homeSagas, botSagas, component]) => {
          injectSagas('homePageContainer', homeSagas.default);
          injectSagas('Bot', botSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: { onEnter: (nextState, replace) => replace('/feedback') },
      childRoutes: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Dashboard/sagas'),
              System.import('containers/Dashboard/DashboardContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('Dashboard', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/surveys',
          name: 'SurveysContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Surveys/SurveysContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/survey/:templateCode',
          name: 'SurveyEditContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/SurveyEdit/sagas'),
              System.import('containers/SurveyEdit/SurveyEditContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('SurveyEditContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
          indexRoute: { onEnter: (nextState, replace) => replace(`/survey/${nextState.params.templateCode}/step1`) },
          childRoutes: [
            {
              path: 'step1',
              name: 'SurveyEditStep1',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('components/SurveyEdit/SurveyEditStep1'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            }, {
              path: 'step2',
              name: 'SurveyEditStep2',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('components/SurveyEdit/SurveyEditStep2'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            },
          ],
        },
        {
          path: '/newsfeed',
          name: 'newsFeedContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/NewsFeedContainer/sagas'),
              System.import('containers/NewsFeedContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('newsFeedContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/feedback',
          name: 'feedbackContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/FeedbackContainer/sagas'),
              System.import('containers/FeedbackContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('feedbackContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
          indexRoute: { onEnter: (nextState, replace) => replace('/feedback/sent') },
          childRoutes: [
            {
              path: 'public',
              name: 'FeedbackPublic',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/FeedbackPublic/sagas'),
                  System.import('containers/FeedbackPublic/FeedbackPublicContainer'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([sagas, component]) => {
                  injectSagas('FeedbackPublic', sagas.default);
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            }, {
              path: 'sent',
              name: 'feedbackGiveContainer',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/FeedbackGiveContainer/sagas'),
                  System.import('containers/FeedbackGiveContainer'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([sagas, component]) => {
                  injectSagas('feedbackGiveContainer', sagas.default);
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            }, {
              path: 'received',
              name: 'feedbackReceivedContainer',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/FeedbackReceivedContainer/sagas'),
                  System.import('containers/FeedbackReceivedContainer'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([sagas, component]) => {
                  injectSagas('feedbackReceivedContainer', sagas.default);
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            }, {
              path: 'received/:id',
              name: 'feedbackReceivedContainer',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/FeedbackReceivedContainer/sagas'),
                  System.import('containers/FeedbackReceivedContainer'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([sagas, component]) => {
                  injectSagas('feedbackReceivedContainer', sagas.default);
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            },
          ],
        },
        {
          path: '/feedback/:feedbackCode',
          name: 'FeedbackDiscussion',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/FeedbackDiscussion/sagas'),
              System.import('containers/FeedbackDiscussion/FeedbackDiscussionContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('FeedbackDiscussion', sagas.default);
              renderRoute(component);
            });
            importModules.catch(errorLoading);
          },
        },
        {
          path: '/members',
          name: 'Members',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Members/sagas'),
              System.import('containers/Members/MembersContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('Members', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/u/:userCode',
          name: 'UserProfileContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/UserProfileContainer/sagas'),
              System.import('containers/UserProfileContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('UserProfileContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/u/:userCode/edit',
          name: 'EditProfileContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/EditProfileContainer/sagas'),
              System.import('containers/EditProfileContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas('EditProfileContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/u/:userCode/password',
          name: 'ChangePasswordContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/ChangePassword/ChangePasswordContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    },
    {
      path: '/linkinvitejointeam/:code',
      name: 'linkInviteJoinTeamContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LinkInviteJoinTeamContainer/sagas'),
          System.import('containers/LinkInviteJoinTeamContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          // injectReducer('linkInviteJoinTeamContainer', reducer.default);
          injectSagas('linkInviteJoinTeamContainer', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ]
}

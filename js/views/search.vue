<template>
<layout :title="_('Search in your data: {q}', {q})">
    <div class="row" v-if="datasets.loading || datasets.has_data">
        <datasets-list class="col-xs-12" :datasets="datasets"></datasets-list>
    </div>
    <div class="row" v-if="communities.loading || communities.has_data">
        <community-list class="col-xs-12" :communities="communities"></community-list>
    </div>
    <div class="row" v-if="reuses.loading || reuses.has_data">
        <reuses-list class="col-xs-12" :reuses="reuses"></reuses-list>
    </div>
    <div class="row" v-if="issues.loading || issues.has_data">
        <issues-list class="col-xs-12" :issues="issues"></issues-list>
    </div>
    <div class="row" v-if="discussions.loading || discussions.has_data">
        <discussions-list class="col-xs-12" :discussions="discussions"></discussions-list>
    </div>
    <div class="row" v-if="no_results">
        <div class="col-xs-12 text-center">
            <p class="lead">{{_('No result found')}}</p>
        </div>
    </div>
</layout>
</template>

<script>
import {PageList} from 'models/base';
import Layout from 'components/layout.vue';
import DatasetsList from 'components/dataset/list.vue';
import ReusesList from 'components/reuse/list.vue';
import IssuesList from 'components/issues/list.vue';
import DiscussionsList from 'components/discussions/list.vue';
import CommunityList from 'components/dataset/communityresource/list.vue';

export default {
    name: 'SearchView',
    components: {
        CommunityList,
        DiscussionsList,
        IssuesList,
        DatasetsList,
        ReusesList,
        Layout
    },
    computed: {
        no_results() {
            const collections = [this.datasets, this.communities, this.reuses, this.issues, this.discussions];
            return !collections.some(function(collection) {
                return collection.loading || collection.has_data;
            });
        }
    },
    data() {
        return {
            q: undefined,
            datasets: new PageList({
                ns: 'me',
                fetch: 'my_org_datasets',
                mask: DatasetList.MASK
            }),
            communities: new PageList({
                ns: 'me',
                fetch: 'my_org_community_resources',
                mask: CommunityList.MASK
            }),
            reuses: new PageList({
                ns: 'me',
                fetch: 'my_org_reuses',
                mask: ReuseList.MASK
            }),
            issues: new PageList({
                ns: 'me',
                fetch: 'my_org_issues',
                mask: IssueList.MASK
            }),
            discussions: new PageList({
                ns: 'me',
                fetch: 'my_org_discussions',
                mask: DiscussionList.MASK
            }),
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.query(to.query.q);
        });
    },
    beforeRouteUpdate(to, from, next) {
        if (to.query.q !== this.q) {
            this.query(q);
            this.$scrollTo(this.$el);
        }
    },
    methods: {
        query(q) {
            this.q = q;
            this.datasets.fetch({'q': q});
            this.communities.fetch({'q': q});
            this.reuses.fetch({'q': q});
            this.issues.fetch({'q': q});
            this.discussions.fetch({'q': q});
        }
    }
};
</script>
